'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { ChatContextType } from '@/types/chat'

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useTranslation()

  useEffect(() => {
    // Ленивая загрузка чата
    const loadChat = async () => {
      try {
        // Загружаем CSS
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'http://46.202.155.177:8080/chat_widget.css'
        document.head.appendChild(link)

        // Загружаем JS
        const script = document.createElement('script')
        script.src = 'http://46.202.155.177:8080/chat_widget.js'
        script.onload = () => {
          setIsLoaded(true)
          // Инициализируем чат с языком
          if (window.initChat) {
            window.initChat({ language })
          }
        }
        document.body.appendChild(script)

        // Отправляем событие в GTM
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'chat_loaded',
            language: language
          })
        }
      } catch (error) {
        console.error('Failed to load chat:', error)
      }
    }

    // Загружаем чат только при первом взаимодействии
    const handleUserInteraction = () => {
      loadChat()
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('scroll', handleUserInteraction)
    }

    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('scroll', handleUserInteraction)

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('scroll', handleUserInteraction)
    }
  }, [language])

  const openChat = () => {
    setIsOpen(true)
    if (window.openChat) window.openChat()
    
    // Отправляем событие в GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'chat_opened',
        language: language
      })
    }
  }

  const closeChat = () => {
    setIsOpen(false)
    if (window.closeChat) window.closeChat()
    
    // Отправляем событие в GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'chat_closed',
        language: language
      })
    }
  }

  const sendMessage = (message: string) => {
    if (window.sendChatMessage) window.sendChatMessage(message)
    
    // Отправляем событие в GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'chat_message_sent',
        language: language
      })
    }
  }

  return (
    <ChatContext.Provider value={{ isLoaded, isOpen, openChat, closeChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useChat must be used within ChatProvider')
  return context
} 