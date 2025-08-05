'use client';

import { useState } from 'react';
import ChatIframe from './ChatIframe';
import { useChatAnalytics } from '@/hooks/useChatAnalytics';

interface ChatButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const ChatButton: React.FC<ChatButtonProps> = ({ 
  className = '', 
  children 
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Используем аналитику
  useChatAnalytics(isChatOpen);

  return (
    <>
      {/* Кнопка открытия чата */}
      <button
        onClick={() => setIsChatOpen(true)}
        className={`
          fixed bottom-6 right-6 z-40 
          bg-gradient-to-r from-blue-600 to-purple-600 
          text-white px-6 py-3 rounded-full 
          shadow-lg hover:shadow-xl 
          transform hover:scale-105 
          transition-all duration-200 
          flex items-center space-x-2
          ${className}
        `}
        aria-label="Открыть чат"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span className="font-medium">Чат с поддержкой</span>
      </button>

      {/* iframe с чатом */}
      <ChatIframe 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default ChatButton; 