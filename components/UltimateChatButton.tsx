'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatAnalytics } from '@/hooks/useChatAnalytics';

interface UltimateChatButtonProps {
  className?: string;
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const UltimateChatButton: React.FC<UltimateChatButtonProps> = ({ 
  className = '', 
  theme = 'light',
  position = 'bottom-right'
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Аналитика
  useChatAnalytics(isChatOpen);

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Позиционирование
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  // Тема
  const isDark = theme === 'dark';

  return (
    <>
      {/* Анимированная кнопка */}
      <motion.button
        onClick={() => setIsChatOpen(true)}
        className={`
          fixed z-40 
          ${getPositionClasses()}
          ${isDark 
            ? 'bg-gray-800 text-white hover:bg-gray-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
          }
          ${isMobile ? 'p-4 rounded-full' : 'px-6 py-3 rounded-full'}
          shadow-lg hover:shadow-xl 
          flex items-center space-x-2
          ${className}
        `}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 300,
          delay: 1 
        }}
        aria-label="Открыть чат"
      >
        <motion.svg 
          className={isMobile ? "w-6 h-6" : "w-5 h-5"}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          animate={{ rotate: isChatOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </motion.svg>
        
        {!isMobile && (
          <motion.span 
            className="font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            Чат с поддержкой
          </motion.span>
        )}
      </motion.button>

      {/* iframe с чатом */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`
                relative bg-white rounded-lg shadow-2xl
                ${isMobile 
                  ? 'w-full h-full m-4' 
                  : 'w-full max-w-4xl h-[80vh]'
                }
                ${isDark ? 'bg-gray-900' : 'bg-white'}
              `}
            >
              {/* Заголовок */}
              <div className={`
                flex items-center justify-between p-4 border-b
                ${isDark ? 'border-gray-700' : 'border-gray-200'}
              `}>
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`
                    text-lg font-semibold
                    ${isDark ? 'text-white' : 'text-gray-800'}
                  `}
                >
                  💬 Онлайн чат с поддержкой
                </motion.h3>
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsChatOpen(false)}
                  className={`
                    p-2 transition-colors
                    ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}
                  `}
                  aria-label="Закрыть чат"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              {/* iframe */}
              <div className="flex-1 h-full">
                <iframe
                  src="https://chat.lysechko-webdesign.com.ua/test_chat.html"
                  className={`w-full h-full border-0 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
                  title="Онлайн чат"
                  allow="microphone; camera"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UltimateChatButton; 