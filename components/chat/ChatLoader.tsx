'use client'

import { useChat } from './ChatProvider'
import { useTranslation } from '@/lib/i18n'

export default function ChatLoader() {
  const { isLoaded } = useChat()
  const { t } = useTranslation()

  if (isLoaded) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-600 text-white rounded-full p-3 md:p-4 shadow-lg md:bottom-6 md:right-6">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-medium hidden md:block">{t('loadingChat')}</span>
      </div>
    </div>
  )
} 