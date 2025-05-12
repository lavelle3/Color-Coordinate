#!/bin/bash

echo ""
echo "🚀 Starting backend server at http://localhost:3000"
echo "⏳ Please wait..."
(cd color-backend && node server.js) &

sleep 2

echo ""
echo "🧠 Starting Angular frontend at http://localhost:4200"
echo "🌐 Open in your browser once ready!"
echo ""
ng serve
