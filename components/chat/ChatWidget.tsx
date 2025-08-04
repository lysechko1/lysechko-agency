'use client'

import { useEffect } from 'react'

interface ChatWidgetProps {
  agentName?: string
  responseTime?: string
  welcomeMessage?: string
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  agentName = 'Александра',
  responseTime = '26 секунд',
  welcomeMessage = 'Привет, чем я могу вам помочь?'
}) => {
  useEffect(() => {
    // Проверяем, не загружен ли уже чат
    if (typeof window !== 'undefined' && (window as any).ChatWidgetLoaded) return
    
    const loadChat = async () => {
      // Загружаем CSS
      if (!document.querySelector('link[href*="chat_widget.css"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'http://46.202.155.177:8080/chat_widget.css'
        document.head.appendChild(link)
      }

      // Загружаем JavaScript
      if (!document.querySelector('script[src*="chat_widget.js"]')) {
        const script = document.createElement('script')
        script.src = 'http://46.202.155.177:8080/chat_widget.js'
        script.onload = () => {
          if (typeof (window as any).ChatWidget !== 'undefined') {
            new (window as any).ChatWidget()
            ;(window as any).ChatWidgetLoaded = true
          }
        }
        document.body.appendChild(script)
      }
    }

    loadChat()
  }, [])

  return (
    <>
      {/* Виджет чата */}
      <div id="chat-widget" className="chat-widget">
        {/* Кнопка чата */}
        <div id="chat-button" className="chat-button">
          <svg className="chat-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        
        {/* Окно чата */}
        <div id="chat-window" className="chat-window hidden">
          {/* Заголовок */}
          <div className="chat-header">
            <div className="agent-info">
              <div className="agent-avatar">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2NjdFRUEiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="Александра" />
              </div>
              <div className="agent-details">
                <div className="agent-name">{agentName}</div>
                <div className="response-time">Отвечает в среднем в течение {responseTime}</div>
              </div>
            </div>
            <div className="header-actions">
              <button id="minimize-chat" className="minimize-btn" title="Свернуть">−</button>
              <button id="close-chat" className="close-btn" title="Закрыть">×</button>
            </div>
          </div>
          
          {/* Сообщения */}
          <div id="chat-messages" className="chat-messages">
            <div className="message agent">
              <div className="message-avatar">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2NjdFRUEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMS43OS00LTQtNC00IDQgMCAyLjIxIDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="Александра" />
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <div className="message-text">{welcomeMessage}</div>
                  <div className="message-time">Сейчас</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Индикатор печати */}
          <div id="typing-indicator" className="typing-indicator hidden">
            <div className="message-avatar">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2NjdFRUEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMS43OS00LTQtNC00IDQgMCAyLjIxIDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="Александра" />
            </div>
            <div className="typing-content">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="typing-text">Печатает...</div>
            </div>
          </div>
          
          {/* Форма ввода */}
          <div className="chat-input-container">
            <div className="input-wrapper">
              <textarea 
                id="message-input" 
                placeholder="Написать сообщение" 
                rows={1}
                maxLength={500}
              />
              <button id="send-button" className="send-btn" title="Отправить">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Ручка для изменения размера */}
          <div className="resize-handle"></div>
        </div>
        
        {/* Минимизированное окно */}
        <div id="minimized-chat" className="minimized-chat hidden">
          <div className="minimized-content">
            <div className="minimized-avatar">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM2NjdFRUEiLz4KPHN2ZyB4PSI2IiB5PSI2IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMS43OS00LTQtNC00IDQgMCAyLjIxIDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="Александра" />
            </div>
            <div className="minimized-info">
              <div className="minimized-name">{agentName}</div>
              <div className="minimized-status">Онлайн</div>
            </div>
            <button id="restore-chat" className="restore-btn" title="Развернуть">□</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatWidget 