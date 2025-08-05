'use client';

import { useState, useEffect } from 'react';

interface ChatIframeProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const DarkChatIframe: React.FC<ChatIframeProps> = ({ 
  isOpen = false, 
  onClose, 
  className = '' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 ${className}`}>
      <div className="relative w-full max-w-4xl h-[80vh] bg-gray-900 rounded-lg shadow-2xl">
        {/* Заголовок с кнопкой закрытия */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">
            💬 Онлайн чат с поддержкой
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Закрыть чат"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* iframe с чат-виджетом */}
        <div className="flex-1 h-full">
          <iframe
            src="https://chat.lysechko-webdesign.com.ua/test_chat.html"
            className="w-full h-full border-0 bg-gray-900"
            title="Онлайн чат"
            allow="microphone; camera"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        
        {/* Индикатор загрузки */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
              <p className="text-gray-300">Загружаем чат...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DarkChatIframe; 