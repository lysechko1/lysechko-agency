'use client'

import { useChat } from './ChatProvider'
import { useTranslation } from '@/lib/i18n'
import { MessageCircle } from 'lucide-react'

export default function ChatButton() {
  const { isLoaded, isOpen, openChat } = useChat()
  const { t } = useTranslation()

  return (
    <button
      onClick={openChat}
      className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 md:p-4 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:bottom-6 md:right-6"
      aria-label={t('liveChat')}
      title={t('liveChat')}
    >
      <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
      <span className="sr-only">{t('liveChat')}</span>
      
      {/* Пульсирующий индикатор для привлечения внимания */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </button>
  )
} 