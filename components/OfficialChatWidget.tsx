'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OfficialChatWidgetProps {
  className?: string;
  position?: 'right' | 'left';
}

const OfficialChatWidget: React.FC<OfficialChatWidgetProps> = ({ 
  className = '', 
  position = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(true);
    }
  }, [isOpen]);

  const getPositionClasses = () => {
    return position === 'left' ? 'left-6' : 'right-6';
  };

  const getChatPositionClasses = () => {
    return position === 'left' ? 'left-0' : 'right-0';
  };

  return (
    <>
      {/* Кнопка чата */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`
          fixed bottom-6 ${getPositionClasses()} z-40
          bg-gradient-to-r from-blue-600 to-purple-600
          text-white px-6 py-3 rounded-full
          shadow-lg hover:shadow-xl 
          transform hover:scale-105 
          transition-all duration-200
          flex items-center space-x-2
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Открыть чат"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="font-medium">Онлайн чат</span>
      </motion.button>

      {/* iframe чат */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ 
                x: position === 'right' ? '100%' : '-100%',
                opacity: 0 
              }}
              animate={{ 
                x: 0,
                opacity: 1 
              }}
              exit={{ 
                x: position === 'right' ? '100%' : '-100%',
                opacity: 0 
              }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`
                fixed top-0 ${getChatPositionClasses()} h-full
                w-full md:w-1/3 lg:w-1/3 xl:w-1/3
                bg-white shadow-2xl
                flex flex-col
              `}
            >
              {/* Заголовок чата */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Lysechko Chat</h3>
                    <p className="text-sm text-gray-500">Официальная поддержка</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Закрыть чат"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* iframe с официальным чатом */}
              <div className="flex-1 relative">
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                      <p className="text-gray-600">Загружаем чат...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://chat.lysechko-webdesign.com.ua/test_chat.html"
                  className="w-full h-full border-0"
                  title="Lysechko Chat"
                  allow="microphone; camera"
                  loading="lazy"
                  onLoad={() => setIsLoaded(true)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OfficialChatWidget; 