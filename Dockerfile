# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.27.0 --activate

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package.json pnpm-lock.yaml* ./
COPY tsconfig*.json ./
COPY prisma.config.ts ./

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
ENV DATABASE_URL="mysql://root:dummy@localhost:3306/dummy"
RUN pnpm exec prisma generate

# Copy source code
COPY src ./src

# Build the application
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm run build

# Production stage
FROM node:24-alpine

WORKDIR /app

# Install OpenSSL for Prisma and wget for healthcheck
RUN apk add --no-cache openssl wget mysql-client

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.27.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./
COPY prisma.config.ts ./

# Install production dependencies
RUN pnpm install --frozen-lockfile --prod || pnpm install --prod

# Copy Prisma schema
COPY prisma ./prisma

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Copy generated Prisma client from builder
COPY --from=builder /app/src/generated ./dist/generated

# Copy public assets
COPY public ./public

# Copy and set permissions for entrypoint script
COPY scripts/docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Expose port (from .env or default 3000)
EXPOSE 3000

# Use entrypoint script to run migrations and start app
CMD ["/bin/sh", "/app/docker-entrypoint.sh"]
