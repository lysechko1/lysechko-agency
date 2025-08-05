'use client';

import { useEffect } from 'react';

const ChatWidget: React.FC = () => {
  useEffect(() => {
    console.log('🔍 ChatWidget: Начинаем загрузку чат-виджета...');
    
    if (typeof window !== 'undefined' && (window as any).ChatWidgetLoaded) {
      console.log('✅ ChatWidget: Виджет уже загружен');
      return;
    }
    
    const loadChat = async () => {
      try {
        console.log('📦 ChatWidget: Загружаем CSS файл...');
        
        // Загружаем CSS
        if (!document.querySelector('link[href*="chat_widget.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://chat.lysechko-webdesign.com.ua/chat_widget.css';
          link.onload = () => console.log('✅ ChatWidget: CSS загружен успешно');
          link.onerror = () => console.error('❌ ChatWidget: Ошибка загрузки CSS');
          document.head.appendChild(link);
        } else {
          console.log('✅ ChatWidget: CSS уже загружен');
        }

        console.log('📦 ChatWidget: Загружаем JavaScript файл...');
        
        // Загружаем JavaScript
        if (!document.querySelector('script[src*="chat_widget.js"]')) {
          const script = document.createElement('script');
          script.src = 'https://chat.lysechko-webdesign.com.ua/chat_widget.js';
          script.onload = () => {
            console.log('✅ ChatWidget: JavaScript загружен успешно');
            
            // Проверяем, доступен ли ChatWidget
            if (typeof (window as any).ChatWidget !== 'undefined') {
              console.log('🚀 ChatWidget: Инициализируем виджет...');
              try {
                new (window as any).ChatWidget();
                (window as any).ChatWidgetLoaded = true;
                console.log('✅ ChatWidget: Виджет инициализирован успешно');
              } catch (error) {
                console.error('❌ ChatWidget: Ошибка инициализации:', error);
              }
            } else {
              console.error('❌ ChatWidget: ChatWidget не найден в window');
            }
          };
          script.onerror = () => console.error('❌ ChatWidget: Ошибка загрузки JavaScript');
          document.body.appendChild(script);
        } else {
          console.log('✅ ChatWidget: JavaScript уже загружен');
          
          // Если JS уже загружен, но виджет не инициализирован
          if (typeof (window as any).ChatWidget !== 'undefined' && !(window as any).ChatWidgetLoaded) {
            console.log('🚀 ChatWidget: Инициализируем уже загруженный виджет...');
            try {
              new (window as any).ChatWidget();
              (window as any).ChatWidgetLoaded = true;
              console.log('✅ ChatWidget: Виджет инициализирован успешно');
            } catch (error) {
              console.error('❌ ChatWidget: Ошибка инициализации:', error);
            }
          }
        }
      } catch (error) {
        console.error('❌ ChatWidget: Общая ошибка загрузки:', error);
      }
    };

    // Запускаем загрузку с небольшой задержкой
    setTimeout(loadChat, 1000);
  }, []);

  return null;
};

export default ChatWidget; 