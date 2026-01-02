# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package.json package-lock.json* ./
COPY tsconfig*.json ./
COPY prisma.config.ts ./

# Install dependencies
RUN npm ci || npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
ENV DATABASE_URL="mysql://root:dummy@localhost:3306/dummy"
RUN npx prisma generate

# Copy source code
COPY src ./src

# Build the application
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Production stage
FROM node:24-alpine

WORKDIR /app

# Install OpenSSL for Prisma and wget for healthcheck
RUN apk add --no-cache openssl wget mysql-client

# Copy package files
COPY package.json package-lock.json* ./
COPY prisma.config.ts ./

# Install production dependencies
RUN npm ci --omit=dev || npm install --omit=dev

# Copy Prisma schema
COPY prisma ./prisma

# Copy generated Prisma client from builder
COPY --from=builder /app/src/generated ./dist/generated

# Copy Prisma schema (runtime)
COPY prisma ./prisma

# Copy public assets
COPY public ./public

# Copy and set permissions for entrypoint script
COPY scripts/docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Expose port (from .env or default 3000)
EXPOSE 3000

# Use entrypoint script to run migrations and start app
CMD ["/bin/sh", "/app/docker-entrypoint.sh"]
