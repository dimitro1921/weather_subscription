#!/bin/sh

echo "🔁 Running DB migrations..."
npx sequelize-cli db:migrate

echo "🚀 Starting app..."
exec npm start
