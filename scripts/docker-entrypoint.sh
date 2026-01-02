#!/bin/sh
set -e

echo "🚀 Starting LapZone application..."

# Set default values from DATABASE_URL or use individual variables
DB_HOST="${DATABASE_HOST:-db}"
DB_PORT="${DATABASE_PORT:-3306}"
DB_USER="${DATABASE_USER:-root}"
DB_PASS="${DATABASE_PASSWORD}"
DB_NAME="${DATABASE_NAME:-lapzone}"

# Debug environment variables
echo "🔍 Debug: DB_HOST=$DB_HOST"
echo "🔍 Debug: DB_PORT=$DB_PORT"
echo "🔍 Debug: DB_USER=$DB_USER"
echo "🔍 Debug: DB_NAME=$DB_NAME"
echo "🔍 Debug: DB_PASS length: ${#DB_PASS}"

# Wait for database to be ready
echo "⏳ Waiting for MySQL database to be ready..."
MAX_TRIES=60
TRIES=0
until mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "SELECT 1" > /dev/null 2>&1; do
  TRIES=$((TRIES+1))
  if [ $TRIES -ge $MAX_TRIES ]; then
    echo "❌ Failed to connect to database after $MAX_TRIES attempts"
    echo "🔍 Testing network connectivity..."
    nc -zv "$DB_HOST" "$DB_PORT" || echo "❌ Cannot reach $DB_HOST:$DB_PORT"
    exit 1
  fi
  echo "⏳ Database is unavailable - sleeping (attempt $TRIES/$MAX_TRIES)"
  sleep 2
done

echo "✅ Database is ready!"

# Run Prisma migrations
echo "🔄 Running database migrations..."
npx prisma migrate deploy

# Start the application (seed sẽ tự động chạy trong app.ts)
echo "🎉 Starting Express server..."
exec node dist/app.js
