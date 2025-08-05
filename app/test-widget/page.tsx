'use client';

import { useEffect, useState } from 'react';

export default function TestWidgetPage() {
  const [widgetStatus, setWidgetStatus] = useState<string>('Проверка...');

  useEffect(() => {
    const checkWidget = () => {
      const chatWidget = document.getElementById('chat-widget');
      const chatButton = document.getElementById('chat-button');
      const chatWindow = document.getElementById('chat-window');
      
      if (chatWidget && chatButton && chatWindow) {
        setWidgetStatus('✅ Виджет загружен и готов к работе');
      } else {
        setWidgetStatus('❌ Виджет не найден');
      }
    };

    // Проверяем через 3 секунды
    setTimeout(checkWidget, 3000);
    
    // Проверяем каждые 2 секунды
    const interval = setInterval(checkWidget, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🧪 Тест чат-виджета
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📊 Статус виджета:</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="font-medium">{widgetStatus}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📋 Инструкции по тестированию:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Посмотрите в правый нижний угол экрана</li>
            <li>Должна быть синяя круглая кнопка с иконкой чата</li>
            <li>Нажмите на кнопку - откроется окно чата</li>
            <li>Попробуйте написать сообщение</li>
            <li>Нажмите кнопку "Отправить" или Enter</li>
            <li>Проверьте, что сообщение появилось в чате</li>
          </ol>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">🎯 Ожидаемый результат:</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Кнопка чата в правом нижнем углу</li>
            <li>• Синий цвет с белой иконкой</li>
            <li>• Анимация при наведении</li>
            <li>• Окно чата открывается при клике</li>
            <li>• Возможность отправки сообщений</li>
            <li>• Адаптивность на мобильных устройствах</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">✅ Если все работает:</h3>
          <p className="text-green-800">
            Чат-виджет полностью интегрирован и готов к использованию! 
            Теперь можно загружать на продакшен.
          </p>
        </div>
      </div>
    </div>
  );
} 