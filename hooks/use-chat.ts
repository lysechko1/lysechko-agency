'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from '@/lib/i18n'

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const { language } = useTranslation()

  // Отправка сообщения
  const sendMessage = useCallback((text: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, message])
    
    // Отправляем в чат-сервер
    if (window.sendChatMessage) {
      window.sendChatMessage(text)
    }
    
    // Отправляем событие в GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'chat_message_sent',
        language: language,
        message_length: text.length
      })
    }
  }, [language])

  // Получение сообщения от агента
  const receiveMessage = useCallback((text: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'agent',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, message])
  }, [])

  // Индикатор печати
  const setTypingIndicator = useCallback((isTyping: boolean) => {
    setIsTyping(isTyping)
  }, [])

  // Очистка истории
  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  // Получение последнего сообщения
  const getLastMessage = useCallback(() => {
    return messages[messages.length - 1]
  }, [messages])

  // Количество непрочитанных сообщений
  const getUnreadCount = useCallback(() => {
    return messages.filter(msg => msg.sender === 'agent').length
  }, [messages])

  return {
    messages,
    isTyping,
    sendMessage,
    receiveMessage,
    setTypingIndicator,
    clearMessages,
    getLastMessage,
    getUnreadCount
  }
} 