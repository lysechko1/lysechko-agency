declare global {
  interface Window {
    initChat?: (config: { language: string }) => void
    openChat?: () => void
    closeChat?: () => void
    sendChatMessage?: (message: string) => void
  }
}

export interface ChatConfig {
  language: 'ru' | 'en'
  serverUrl: string
  websocketUrl: string
}

export interface ChatContextType {
  isLoaded: boolean
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  sendMessage: (message: string) => void
} 