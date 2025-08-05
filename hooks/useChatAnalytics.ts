import { useEffect } from 'react';

export const useChatAnalytics = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // Отправляем событие в Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'chat_opened', {
          event_category: 'engagement',
          event_label: 'chat_widget'
        });
      }

      // Отправляем событие в Google Tag Manager
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'chat_widget_opened',
          timestamp: new Date().toISOString()
        });
      }

      console.log('📊 Chat analytics: Chat opened');
    }
  }, [isOpen]);
};

// Расширяем типы для глобальных объектов
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
} 