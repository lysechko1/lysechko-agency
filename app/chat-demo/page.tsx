'use client';

import { useState } from 'react';
import ChatIframe from '@/components/ChatIframe';
import ChatButton from '@/components/ChatButton';
import ResponsiveChatButton from '@/components/ResponsiveChatButton';
import AnimatedChatButton from '@/components/AnimatedChatButton';
import CompactChatButton from '@/components/CompactChatButton';
import DarkChatIframe from '@/components/DarkChatIframe';
import UltimateChatButton from '@/components/UltimateChatButton';

export default function ChatDemoPage() {
  const [isBasicChatOpen, setIsBasicChatOpen] = useState(false);
  const [isDarkChatOpen, setIsDarkChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          🧪 Демо чат-виджетов
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Базовый iframe */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">1. Базовый ChatIframe</h2>
            <p className="text-gray-600 mb-4">
              Простой iframe компонент без кнопки
            </p>
            <button
              onClick={() => setIsBasicChatOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Открыть чат
            </button>
          </div>

          {/* Темная тема */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">2. Темная тема</h2>
            <p className="text-gray-600 mb-4">
              ChatIframe с темной темой
            </p>
            <button
              onClick={() => setIsDarkChatOpen(true)}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Открыть темный чат
            </button>
          </div>

          {/* ChatButton */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">3. ChatButton</h2>
            <p className="text-gray-600 mb-4">
              Кнопка с встроенным iframe
            </p>
            <ChatButton />
          </div>

          {/* ResponsiveChatButton */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">4. ResponsiveChatButton</h2>
            <p className="text-gray-600 mb-4">
              Адаптивная версия для мобильных
            </p>
            <ResponsiveChatButton />
          </div>

          {/* AnimatedChatButton */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">5. AnimatedChatButton</h2>
            <p className="text-gray-600 mb-4">
              Анимированная версия с Framer Motion
            </p>
            <AnimatedChatButton />
          </div>

          {/* CompactChatButton */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">6. CompactChatButton</h2>
            <p className="text-gray-600 mb-4">
              Компактная версия для мобильных
            </p>
            <CompactChatButton />
          </div>

          {/* UltimateChatButton */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">7. UltimateChatButton</h2>
            <p className="text-gray-600 mb-4">
              Максимальная функциональность
            </p>
            <UltimateChatButton />
          </div>

          {/* UltimateChatButton - темная тема */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">8. UltimateChatButton - Dark</h2>
            <p className="text-gray-600 mb-4">
              Темная тема с максимальной функциональностью
            </p>
            <UltimateChatButton theme="dark" />
          </div>

          {/* UltimateChatButton - левая позиция */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">9. UltimateChatButton - Left</h2>
            <p className="text-gray-600 mb-4">
              Кнопка в левом нижнем углу
            </p>
            <UltimateChatButton position="bottom-left" />
          </div>
        </div>

        {/* Информация */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">ℹ️ Информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">✅ Преимущества iframe:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Быстрая загрузка</li>
                <li>• Безопасность</li>
                <li>• Адаптивность</li>
                <li>• Кастомизация</li>
                <li>• Аналитика</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🔧 Настройки:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• URL: chat.lysechko-webdesign.com.ua</li>
                <li>• Позиции: 4 варианта</li>
                <li>• Темы: светлая/темная</li>
                <li>• Анимации: Framer Motion</li>
                <li>• Аналитика: GA + GTM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Базовый iframe */}
      <ChatIframe 
        isOpen={isBasicChatOpen}
        onClose={() => setIsBasicChatOpen(false)}
      />

      {/* Темный iframe */}
      <DarkChatIframe 
        isOpen={isDarkChatOpen}
        onClose={() => setIsDarkChatOpen(false)}
      />
    </div>
  );
} 