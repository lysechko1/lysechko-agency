# 💬 Чат-виджет для Lysechko Agency

## 🚀 Доступные компоненты

### 1. `ChatIframe.tsx` - Основной iframe компонент
```typescript
import ChatIframe from '@/components/ChatIframe';

<ChatIframe 
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
/>
```

### 2. `ChatButton.tsx` - Кнопка с iframe
```typescript
import ChatButton from '@/components/ChatButton';

<ChatButton />
```

### 3. `ResponsiveChatButton.tsx` - Адаптивная версия
```typescript
import ResponsiveChatButton from '@/components/ResponsiveChatButton';

<ResponsiveChatButton />
```

### 4. `AnimatedChatButton.tsx` - Анимированная версия
```typescript
import AnimatedChatButton from '@/components/AnimatedChatButton';

<AnimatedChatButton />
```

### 5. `CompactChatButton.tsx` - Компактная версия для мобильных
```typescript
import CompactChatButton from '@/components/CompactChatButton';

<CompactChatButton />
```

### 6. `DarkChatIframe.tsx` - Темная тема
```typescript
import DarkChatIframe from '@/components/DarkChatIframe';

<DarkChatIframe 
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
/>
```

## 📱 Интеграция в layout.tsx

```typescript
import ResponsiveChatButton from "@/components/ResponsiveChatButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        {children}
        <ResponsiveChatButton />
      </body>
    </html>
  );
}
```

## 🎨 Кастомизация

### Изменение URL чата
```typescript
// В любом компоненте iframe
<iframe
  src="https://your-custom-chat-url.com"
  className="w-full h-full border-0"
  title="Онлайн чат"
/>
```

### Изменение стилей кнопки
```typescript
<ChatButton className="custom-button-class" />
```

### Аналитика
Все компоненты автоматически отправляют события в Google Analytics и Google Tag Manager при открытии чата.

## 🔧 Настройки

### Размеры iframe
- **Десктоп**: `max-w-4xl h-[80vh]`
- **Мобильный**: `w-80 h-96`

### Цвета
- **Светлая тема**: `bg-white`, `text-gray-800`
- **Темная тема**: `bg-gray-900`, `text-white`

### Анимации
- **Framer Motion**: Плавные переходы и hover эффекты
- **CSS**: Базовые анимации для всех компонентов

## 📊 Аналитика

События автоматически отправляются в:
- Google Analytics (`gtag`)
- Google Tag Manager (`dataLayer`)

### События
- `chat_opened` - Чат открыт
- `chat_widget_opened` - Виджет чата открыт

## 🚀 Быстрый старт

1. **Установка зависимостей**:
```bash
npm install framer-motion --legacy-peer-deps
```

2. **Добавление в layout.tsx**:
```typescript
import ResponsiveChatButton from "@/components/ResponsiveChatButton";

// В body
<ResponsiveChatButton />
```

3. **Готово!** 🎉

## ✅ Преимущества

- 🚀 **Быстрая загрузка** - iframe не блокирует основной сайт
- 🔒 **Безопасность** - изолированная среда
- 📱 **Адаптивность** - работает на всех устройствах
- 🎨 **Кастомизация** - полный контроль над дизайном
- 📊 **Аналитика** - встроенное отслеживание
- ⚡ **Производительность** - оптимизировано для Vercel

## 🔗 URL чата

Текущий URL: `https://chat.lysechko-webdesign.com.ua/test_chat.html`

Для изменения URL отредактируйте `src` в iframe компонентах. 