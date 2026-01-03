#!/bin/sh
set -e

echo "🚀 Starting LapZone application..."

# Wait for database to be ready
echo "⏳ Waiting for MySQL database to be ready..."
MAX_TRIES=60
TRIES=0
until mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" --skip-ssl "$DB_NAME" -e "SELECT 1" > /dev/null 2>&1; do
  TRIES=$((TRIES+1))
  if [ $TRIES -ge $MAX_TRIES ]; then
    echo "❌ Failed to connect to database after $MAX_TRIES attempts"
    echo "🔍 Testing with full error output:"
    mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" --skip-ssl "$DB_NAME" -e "SELECT 1"
    exit 1
  fi
  if [ $((TRIES % 10)) -eq 1 ]; then
    echo "⏳ Waiting for database... (attempt $TRIES/$MAX_TRIES)"
  fi
  sleep 2
done

echo "✅ Database is ready!"

# Run Prisma migrations
echo "🔄 Running database migrations..."
npx prisma migrate deploy

# Start the application
echo "🎉 Starting Express server..."
exec node dist/app.js
