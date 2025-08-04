# 🚀 QUICK START: Интеграция чат-виджета

## ✅ **Что у вас есть:**

- ✅ **Рабочий чат-виджет** с полной функциональностью
- ✅ **TypeScript компоненты** готовы для интеграции
- ✅ **Telegram бот** настроен и работает
- ✅ **WebSocket сервер** работает на `http://46.202.155.177:8080`

## 📋 **Краткая инструкция для интеграции:**

### 1. **Скопируйте компоненты чата:**

```tsx
// components/chat/ChatProvider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ChatContext = createContext(null)

export function ChatProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (window.ChatWidgetLoaded) return

    const loadChat = async () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:'
        const baseUrl = `${protocol}//46.202.155.177:8080`

        // Загружаем CSS
        if (!document.querySelector('link[href*="chat_widget.css"]')) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = `${baseUrl}/chat_widget.css`
          document.head.appendChild(link)
        }

        // Загружаем JS
        if (!document.querySelector('script[src*="chat_widget.js"]')) {
          const script = document.createElement('script')
          script.src = `${baseUrl}/chat_widget.js`
          script.onload = () => {
            setIsLoaded(true)
            window.ChatWidgetLoaded = true
            
            if (window.ChatWidget) {
              new window.ChatWidget({ language: 'ru' })
            }
          }
          document.body.appendChild(script)
        }
      } catch (error) {
        console.error('Failed to load chat:', error)
      }
    }

    loadChat()
  }, [])

  const openChat = () => {
    setIsOpen(true)
    if (window.openChat) window.openChat()
  }

  const closeChat = () => {
    setIsOpen(false)
    if (window.closeChat) window.closeChat()
  }

  return (
    <ChatContext.Provider value={{ isLoaded, isOpen, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used within ChatProvider')
  return context
}
```

### 2. **Создайте кнопку чата:**

```tsx
// components/chat/ChatButton.tsx
'use client'

import { useChat } from './ChatProvider'

export default function ChatButton() {
  const { openChat } = useChat()

  return (
    <button
      onClick={openChat}
      className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
      aria-label="Live Chat"
      title="Live Chat"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      
      {/* Пульсирующий индикатор */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </button>
  )
}
```

### 3. **Интегрируйте в layout:**

```tsx
// app/layout.tsx или pages/_app.tsx
import { ChatProvider } from '@/components/chat/ChatProvider'
import ChatButton from '@/components/chat/ChatButton'

export default function Layout({ children }) {
  return (
    <ChatProvider>
      {children}
      <ChatButton />
    </ChatProvider>
  )
}
```

## 🎯 **Результат:**

После интеграции на вашем сайте будет:
- ✅ Красивая кнопка чата в правом нижнем углу
- ✅ Real-time сообщения через WebSocket
- ✅ Сообщения в Telegram бот `@chat_lysechko_agency_bot`
- ✅ Адаптивный дизайн для всех устройств

## 🔗 **Демо и ссылки:**

- **Демо чата:** `http://46.202.155.177:8080/test_chat.html`
- **Сервер чата:** `http://46.202.155.177:8080`
- **Telegram бот:** `@chat_lysechko_agency_bot`

## 🚀 **Готово к использованию!**

Чат полностью настроен и готов к работе. Просто интегрируйте компоненты в ваш TypeScript проект!

---
**Дата:** 2024-01-XX  
**Статус:** ✅ Готово к интеграции 