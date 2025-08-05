'use client';

import { useEffect } from 'react';

export default function SimpleTestPage() {
  useEffect(() => {
    // Прямое подключение согласно официальной документации
    const loadChatWidget = () => {
      // Загружаем CSS
      if (!document.querySelector('link[href*="chat_widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://chat.lysechko-webdesign.com.ua/chat_widget.css';
        document.head.appendChild(link);
      }

      // Загружаем JavaScript
      if (!document.querySelector('script[src*="chat_widget.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://chat.lysechko-webdesign.com.ua/chat_widget.js';
        script.onload = () => {
          if (typeof (window as any).ChatWidget !== 'undefined') {
            new (window as any).ChatWidget();
            console.log('✅ Чат-виджет инициализирован');
          } else {
            console.error('❌ ChatWidget не найден');
          }
        };
        document.body.appendChild(script);
      }
    };

    // Запускаем загрузку
    loadChatWidget();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🧪 Простой тест чат-виджета
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📋 Инструкции:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Посмотрите в правый нижний угол экрана</li>
            <li>Должна появиться кнопка чата</li>
            <li>Нажмите на кнопку для открытия чата</li>
            <li>Напишите тестовое сообщение</li>
            <li>Проверьте консоль браузера (F12) на ошибки</li>
          </ol>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">🔧 Техническая информация:</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• CSS: https://chat.lysechko-webdesign.com.ua/chat_widget.css</li>
            <li>• JS: https://chat.lysechko-webdesign.com.ua/chat_widget.js</li>
            <li>• WebSocket: wss://chat.lysechko-webdesign.com.ua/ws/</li>
            <li>• Telegram: @chat_lysechko_agency_bot</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Если виджет не появился:</h3>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• Проверьте консоль браузера на ошибки</li>
            <li>• Убедитесь, что сайт работает по HTTPS</li>
            <li>• Проверьте блокировщики рекламы</li>
            <li>• Попробуйте обновить страницу</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 