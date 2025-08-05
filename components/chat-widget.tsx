'use client';

import { useEffect } from 'react';

const ChatWidget: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const createChatHTML = () => {
      // Проверяем, не создан ли уже виджет
      if (document.getElementById('chat-widget')) {
        return;
      }

      // Создаем HTML структуру чат-виджета
      const chatWidgetHTML = `
        <div id="chat-widget" class="chat-widget">
          <!-- Кнопка чата -->
          <div id="chat-button" class="chat-button">
            <svg class="chat-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          
          <!-- Окно чата -->
          <div id="chat-window" class="chat-window hidden">
            <!-- Заголовок -->
            <div class="chat-header">
              <h3>Онлайн консультация</h3>
              <button id="close-chat" class="close-btn">×</button>
            </div>
            
            <!-- Сообщения -->
            <div id="chat-messages" class="chat-messages">
              <div class="message system">
                <div class="message-text">Добро пожаловать! Чем могу помочь?</div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
              </div>
            </div>
            
            <!-- Форма ввода -->
            <div class="chat-input-container">
              <input type="text" id="message-input" placeholder="Введите сообщение...">
              <button id="send-button">Отправить</button>
            </div>
          </div>
        </div>
      `;

      // Добавляем HTML в body
      document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);
    };

    const loadChat = async () => {
      // Загружаем CSS
      if (!document.querySelector('link[href*="chat_widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://chat.lysechko-webdesign.com.ua/chat_widget.css';
        document.head.appendChild(link);
      }

      // Создаем HTML структуру
      createChatHTML();

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