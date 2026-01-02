#!/bin/sh
set -e

echo "🚀 Starting LapZone application..."

# Wait for database to be ready
echo "⏳ Waiting for MySQL database to be ready..."
until mysql -h"$DATABASE_HOST" -P"$DATABASE_PORT" -u"$DATABASE_USER" -p"$DATABASE_PASSWORD" "$DATABASE_NAME" -e "SELECT 1" > /dev/null 2>&1; do
  echo "⏳ Database is unavailable - sleeping"
  sleep 2
done

echo "✅ Database is ready!"

# Run Prisma migrations
echo "🔄 Running database migrations..."
pnpm exec prisma migrate deploy

# Start the application (seed sẽ tự động chạy trong app.ts)
echo "🎉 Starting Express server..."
exec node dist/app.js
