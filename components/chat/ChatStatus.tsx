'use client'

import { useChat } from './ChatProvider'
import { useTranslation } from '@/lib/i18n'

export default function ChatStatus() {
  const { isLoaded, isOpen } = useChat()
  const { t } = useTranslation()

  return (
    <div className="fixed bottom-20 right-4 z-40 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg md:bottom-24 md:right-6">
      <span className="flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        {isOpen ? t('chatOpen') : t('chatAvailable')}
      </span>
    </div>
  )
} 