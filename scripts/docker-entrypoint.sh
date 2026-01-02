#!/bin/sh
set -e

echo "🚀 Starting LapZone application..."

# Set default values from DATABASE_URL or use individual variables
DB_HOST="${DATABASE_HOST:-db}"
DB_PORT="${DATABASE_PORT:-3306}"
DB_USER="${DATABASE_USER:-root}"
DB_PASS="${DATABASE_PASSWORD}"
DB_NAME="${DATABASE_NAME:-lapzone}"

# Wait for database to be ready
echo "⏳ Waiting for MySQL database to be ready..."
until mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "SELECT 1" > /dev/null 2>&1; do
  echo "⏳ Database is unavailable - sleeping"
  sleep 2
done

echo "✅ Database is ready!"

# Run Prisma migrations
echo "🔄 Running database migrations..."
npx prisma migrate deploy

# Start the application (seed sẽ tự động chạy trong app.ts)
echo "🎉 Starting Express server..."
exec node dist/app.js
