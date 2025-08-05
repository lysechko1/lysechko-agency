'use client';

import { useEffect } from 'react';

const ChatWidget: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadChat = async () => {
      // Загружаем CSS
      if (!document.querySelector('link[href*="chat_widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://chat.lysechko-webdesign.com.ua/chat_widget.css';
        document.head.appendChild(link);
      }

      // Загружаем JavaScript
      if (!document.querySelector('script[src*="chat_widget.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://chat.lysechko-webdesign.com.ua/chat_widget.js';
        script.onload = () => {
          if (typeof (window as any).ChatWidget !== 'undefined') {
            new (window as any).ChatWidget();
          }
        };
        document.body.appendChild(script);
      }
    };

    loadChat();
  }, []);

  return null;
};

export default ChatWidget; 