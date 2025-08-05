'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StartDuckChatWidgetProps {
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const StartDuckChatWidget: React.FC<StartDuckChatWidgetProps> = ({ 
  className = '', 
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Привет, чем я могу вам помочь?',
      sender: 'agent',
      time: '16:21'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString('ru-RU', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Симуляция ответа агента
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          text: 'Спасибо за ваше сообщение! Я скоро отвечу.',
          sender: 'agent',
          time: new Date().toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Кнопка чата */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`
          fixed z-40 ${getPositionClasses()}
          bg-gradient-to-r from-orange-500 to-orange-600
          text-white p-4 rounded-full
          shadow-lg hover:shadow-xl 
          transform hover:scale-105 
          transition-all duration-200
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Открыть чат"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>

      {/* Окно чата */}
      <AnimatePresence>
        {isOpen && (
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
              className="relative w-full max-w-md h-[500px] bg-white rounded-lg shadow-2xl overflow-hidden"
            >
              {/* Заголовок */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 relative overflow-hidden">
                {/* Декоративные звезды */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="absolute top-4 right-8 w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="absolute top-6 right-4 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  <div className="absolute top-8 right-6 w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="absolute top-3 right-12 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                </div>
                
                {/* Профиль агента */}
                <div className="flex items-center space-x-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Александра</div>
                    <div className="text-gray-300 text-sm">Отвечает в среднем в течение 26 секунд</div>
                  </div>
                </div>
                
                {/* Декоративный элемент */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-orange-500 rounded-full opacity-60"></div>
              </div>

              {/* Область сообщений */}
              <div className="flex-1 h-full bg-white relative">
                {/* Точчатый фон */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                
                {/* Сообщения */}
                <div className="relative z-10 h-full overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-xs ${msg.sender === 'agent' ? 'bg-gray-100' : 'bg-orange-500 text-white'} rounded-lg px-3 py-2`}>
                        <div className="text-sm">{msg.text}</div>
                        <div className={`text-xs mt-1 ${msg.sender === 'agent' ? 'text-gray-500' : 'text-orange-100'}`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Область ввода */}
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Написать сообщение"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="w-10 h-10 bg-gray-300 hover:bg-orange-500 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                
                {/* Ручка для изменения размера */}
                <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto mt-3 cursor-ns-resize"></div>
              </div>
            </motion.div>

            {/* Кнопка закрытия */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Брендинг start:Duck */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 text-xs text-gray-500">
              <span>Powered by</span>
              <div className="flex items-center space-x-1">
                <span className="text-black font-medium">start:</span>
                <span className="text-orange-500 font-bold">Duck</span>
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StartDuckChatWidget; 