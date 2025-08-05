'use client';

import { useEffect, useState } from 'react';

export default function DebugChatPage() {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [chatElements, setChatElements] = useState<any>({});

  useEffect(() => {
    const logs: string[] = [];
    
    // Перехватываем console.log для отображения в UI
    const originalLog = console.log;
    const originalError = console.error;
    
    console.log = (...args) => {
      originalLog(...args);
      logs.push(`✅ ${args.join(' ')}`);
      setDebugInfo([...logs]);
    };
    
    console.error = (...args) => {
      originalError(...args);
      logs.push(`❌ ${args.join(' ')}`);
      setDebugInfo([...logs]);
    };

    // Проверяем элементы чата каждые 2 секунды
    const checkChatElements = () => {
      const elements = {
        chatButton: document.querySelector('.chat-button'),
        chatWidget: document.querySelector('.chat-widget'),
        chatContainer: document.querySelector('.chat-container'),
        chatHeader: document.querySelector('.chat-header'),
        chatMessages: document.querySelector('.chat-messages'),
        chatInput: document.querySelector('.chat-input'),
      };
      
      setChatElements(elements);
    };

    const interval = setInterval(checkChatElements, 2000);
    setTimeout(checkChatElements, 1000);

    return () => {
      console.log = originalLog;
      console.error = originalError;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🔍 Отладка чат-виджета
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Логи */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">📋 Логи загрузки:</h2>
            <div className="bg-gray-100 p-4 rounded-lg max-h-96 overflow-y-auto">
              {debugInfo.length === 0 ? (
                <p className="text-gray-500">Ожидание логов...</p>
              ) : (
                debugInfo.map((log, index) => (
                  <div key={index} className="text-sm font-mono mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Элементы чата */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🎯 Элементы чата:</h2>
            <div className="space-y-2">
              {Object.entries(chatElements).map(([name, element]) => (
                <div key={name} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${element ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="font-medium">{name}:</span>
                  <span className="text-sm text-gray-600">
                    {element ? '✅ Найден' : '❌ Не найден'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Инструкции */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📖 Инструкции:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Откройте консоль браузера (F12)</li>
            <li>Посмотрите на логи загрузки выше</li>
            <li>Проверьте элементы чата в правой колонке</li>
            <li>Посмотрите в правый нижний угол - должна быть кнопка чата</li>
            <li>Если кнопки нет, проверьте ошибки в консоли</li>
          </ol>
        </div>

        {/* Принудительная загрузка */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">🔧 Принудительная загрузка:</h2>
          <button 
            onClick={() => {
              console.log('🔄 Принудительная перезагрузка чат-виджета...');
              (window as any).ChatWidgetLoaded = false;
              const script = document.createElement('script');
              script.src = 'https://chat.lysechko-webdesign.com.ua/chat_widget.js';
              script.onload = () => {
                if (typeof (window as any).ChatWidget !== 'undefined') {
                  new (window as any).ChatWidget();
                  (window as any).ChatWidgetLoaded = true;
                  console.log('✅ Чат-виджет перезагружен');
                }
              };
              document.body.appendChild(script);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Перезагрузить чат-виджет
          </button>
        </div>
      </div>
    </div>
  );
} 