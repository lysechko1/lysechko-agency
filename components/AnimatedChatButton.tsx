'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedChatIframe from './AnimatedChatIframe';

interface AnimatedChatButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedChatButton: React.FC<AnimatedChatButtonProps> = ({ 
  className = '', 
  children 
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Анимированная кнопка открытия чата */}
      <motion.button
        onClick={() => setIsChatOpen(true)}
        className={`
          fixed bottom-6 right-6 z-40 
          bg-gradient-to-r from-blue-600 to-purple-600 
          text-white px-6 py-3 rounded-full 
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
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          animate={{ rotate: isChatOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </motion.svg>
        <motion.span 
          className="font-medium"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          Чат с поддержкой
        </motion.span>
      </motion.button>

      {/* Анимированный iframe с чатом */}
      <AnimatedChatIframe 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default AnimatedChatButton; 