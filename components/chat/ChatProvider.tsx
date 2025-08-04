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
    // Проверяем, не загружен ли уже чат
    if (window.ChatWidgetLoaded) return

    // Загружаем чат сразу при монтировании
    const loadChat = async () => {
      try {
        // Определяем протокол для совместимости с HTTPS
        const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:'
        const baseUrl = `${protocol}//46.202.155.177:8080`

        // Проверяем, не загружены ли уже файлы
        if (document.querySelector('link[href*="chat_widget.css"]')) {
          console.log('Chat CSS already loaded')
          console.log('Loading chat CSS from:', `${baseUrl}/chat_widget.css`)
        } else {
          // Загружаем CSS
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = `${baseUrl}/chat_widget.css`
          document.head.appendChild(link)
        }

        // Проверяем, не загружен ли уже JS
        if (document.querySelector('script[src*="chat_widget.js"]')) {
          console.log('Chat JS already loaded')
          console.log('Loading chat JS from:', `${baseUrl}/chat_widget.js`)
        } else {
          // Загружаем JS
          const script = document.createElement('script')
          script.src = `${baseUrl}/chat_widget.js`
          script.onload = () => {
            setIsLoaded(true)
            window.ChatWidgetLoaded = true
            
            // Инициализируем чат согласно мануалу
            if (window.ChatWidget) {
              new window.ChatWidget()
            } else if (window.initChat) {
              // Fallback для старого API
              window.initChat({ language })
            }
          }
          document.body.appendChild(script)
        }

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

    // Загружаем чат сразу
    loadChat()
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