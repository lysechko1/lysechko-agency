'use client';

import { useEffect } from 'react';

const OriginalChatWidget: React.FC = () => {
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
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
            </svg>
          </div>
          
          <!-- Окно чата -->
          <div id="chat-window" class="chat-window hidden">
            <!-- Заголовок -->
            <div class="chat-header">
              <div class="agent-info">
                <div class="agent-avatar">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2NjdFRUEiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="Александра">
                </div>
                <div class="agent-details">
                  <div class="agent-name">Александра</div>
                  <div class="response-time">Отвечает в среднем в течение 26 секунд</div>
                </div>
              </div>
              <div class="header-actions">
                <button id="minimize-chat" class="minimize-btn" title="Свернуть">−</button>
                <button id="close-chat" class="close-btn" title="Закрыть">×</button>
              </div>
            </div>
            
            <!-- Сообщения -->
            <div id="chat-messages" class="chat-messages">
              <div class="message agent">
                <div class="message-avatar">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2NjdFRUEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMS43OS00LTQtNC00IDQgMCAyLjIxIDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="Александра">
                </div>
                <div class="message-content">
                  <div class="message-bubble">
                    <div class="message-text">Привет, чем я могу вам помочь?</div>
                    <div class="message-time">${new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Индикатор печати -->
            <div id="typing-indicator" class="typing-indicator hidden">
              <div class="message-avatar">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2NjdFRUEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMS43OS00LTQtNC00IDQgMCAyLjIxIDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="Александра">
              </div>
              <div class="typing-content">
                <div class="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="typing-text">Печатает...</div>
              </div>
            </div>
            
            <!-- Форма ввода -->
            <div class="chat-input-container">
              <div class="input-wrapper">
                <textarea 
                  id="message-input" 
                  placeholder="Написать сообщение" 
                  rows="1"
                  maxlength="500"
                ></textarea>
                <button id="send-button" class="send-btn" title="Отправить">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Ручка для изменения размера -->
            <div class="resize-handle"></div>
          </div>
          
          <!-- Минимизированное окно -->
          <div id="minimized-chat" class="minimized-chat hidden">
            <div class="minimized-content">
              <div class="minimized-avatar">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM2NjdFRUEiLz4KPHN2ZyB4PSI2IiB5PSI2IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMS43OS00LTQtNC00IDQgMCAyLjIxIDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="Александра">
              </div>
              <div class="minimized-info">
                <div class="minimized-name">Александра</div>
                <div class="minimized-status">Онлайн</div>
              </div>
              <button id="restore-chat" class="restore-btn" title="Развернуть">□</button>
            </div>
          </div>
        </div>
      `;

      // Добавляем HTML в body
      document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);
    };

    const loadChat = async () => {
      // Загружаем CSS
      if (!document.querySelector('link[href*="modern_chat_widget.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/modern_chat_widget.css';
        document.head.appendChild(link);
      }

      // Создаем HTML структуру
      createChatHTML();

      // Загружаем JavaScript
      if (!document.querySelector('script[src*="modern_chat_widget.js"]')) {
        const script = document.createElement('script');
        script.src = '/modern_chat_widget.js';
        script.onload = () => {
          console.log('✅ Original chat widget загружен');
        };
        document.body.appendChild(script);
      }
    };

    loadChat();
  }, []);

  return null;
};

export default OriginalChatWidget; 