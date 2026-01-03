#!/bin/sh
set -e

echo "🚀 Starting LapZone application..."

# Wait for database to be ready
echo "⏳ Waiting for MySQL database to be ready..."
MAX_TRIES=60
TRIES=0
until mariadb --ssl-mode=DISABLED -h "$DATABASE_HOST" -P "$DATABASE_PORT" -u "$DATABASE_USER" -p"$DATABASE_PASSWORD" "$DATABASE_NAME" -e "SELECT 1" > /dev/null 2>&1; do
  TRIES=$((TRIES+1))
  if [ $TRIES -ge $MAX_TRIES ]; then
    echo "❌ Failed to connect to database after $MAX_TRIES attempts"
    echo "🔍 Testing with full error output:"
    mariadb --ssl-mode=DISABLED -h "$DATABASE_HOST" -P "$DATABASE_PORT" -u "$DATABASE_USER" -p"$DATABASE_PASSWORD" "$DATABASE_NAME" -e "SELECT 1"
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
