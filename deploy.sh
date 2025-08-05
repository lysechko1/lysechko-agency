#!/bin/bash

echo "🚀 Начинаем деплой исправлений чат-виджета..."

# Проверяем статус
echo "📋 Проверяем статус git..."
git status

# Добавляем все изменения
echo "📦 Добавляем все изменения..."
git add .

# Коммитим изменения
echo "💾 Коммитим изменения..."
git commit -m "Fix: Use iframe chat widget version for proper functionality

- Changed from modern_chat_widget.css/js to chat_widget.css/js
- Updated ChatProvider to use ChatWidget instead of ModernChatWidget
- Fixed button colors to purple (bg-purple-600)
- Added proper iframe/webworker functionality
- Updated test files for debugging"

# Пушим изменения
echo "🚀 Пушим изменения на сервер..."
git push origin main

echo "✅ Деплой завершен!"
echo "📝 Проверьте статус деплоя на Vercel Dashboard"
echo "🌐 Сайт: https://lysechko-agency.vercel.app/" 