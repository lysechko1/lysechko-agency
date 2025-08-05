'use client';

import { useEffect, useState } from 'react';

export default function TestChatPage() {
  const [chatLoaded, setChatLoaded] = useState(false);
  const [chatWidgetExists, setChatWidgetExists] = useState(false);

  useEffect(() => {
    // Проверяем загрузку чат-виджета
    const checkChatWidget = () => {
      const chatButton = document.querySelector('.chat-button');
      const chatWidget = document.querySelector('.chat-widget');
      
      if (chatButton || chatWidget) {
        setChatWidgetExists(true);
        setChatLoaded(true);
      }
    };

    // Проверяем каждые 2 секунды
    const interval = setInterval(checkChatWidget, 2000);
    
    // Первая проверка через 3 секунды
    setTimeout(checkChatWidget, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Тест чат-виджета
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Статус загрузки:</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${chatLoaded ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="font-medium">
                {chatLoaded ? '✅ Чат-виджет загружен' : '⏳ Загрузка чат-виджета...'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${chatWidgetExists ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="font-medium">
                {chatWidgetExists ? '✅ Элементы чата найдены' : '❌ Элементы чата не найдены'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Инструкции по тестированию:</h2>
          
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Посмотрите в правый нижний угол экрана - там должна быть кнопка чата</li>
            <li>Нажмите на кнопку чата для открытия окна</li>
            <li>Напишите тестовое сообщение</li>
            <li>Проверьте, что сообщение пришло в Telegram бот</li>
            <li>Ответьте через Telegram - сообщение должно появиться в чате</li>
          </ol>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Важно:</h3>
            <p className="text-blue-800 text-sm">
              Убедитесь, что у вас настроен Telegram бот @chat_lysechko_agency_bot 
              и отправлено сообщение /start для активации.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 