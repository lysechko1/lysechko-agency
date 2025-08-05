class ModernChatWidget {
    constructor(options = {}) {
        this.config = {
            serverUrl: options.serverUrl || 'ws://46.202.155.177:8080',
            agentName: options.agentName || 'Александра',
            responseTime: options.responseTime || '26 секунд',
            welcomeMessage: options.welcomeMessage || 'Привет, чем я могу вам помочь?',
            ...options
        };
        
        this.userId = this.generateUserId();
        this.websocket = null;
        this.isConnected = false;
        this.isTyping = false;
        this.unreadCount = 0;
        this.isMinimized = false;
        this.messages = [];
        
        this.init();
    }
    
    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
    
    init() {
        this.setupEventListeners();
        this.connectWebSocket();
        this.updateAgentInfo();
    }
    
    updateAgentInfo() {
        // Обновляем информацию об агенте
        const agentName = document.querySelector('.agent-name');
        const responseTime = document.querySelector('.response-time');
        const minimizedName = document.querySelector('.minimized-name');
        
        if (agentName) agentName.textContent = this.config.agentName;
        if (responseTime) responseTime.textContent = `Отвечает в среднем в течение ${this.config.responseTime}`;
        if (minimizedName) minimizedName.textContent = this.config.agentName;
    }
    
    setupEventListeners() {
        // Кнопка открытия чата
        const chatButton = document.getElementById('chat-button');
        if (chatButton) {
            chatButton.addEventListener('click', () => {
                this.toggleChat();
            });
        }
        
        // Кнопка закрытия
        const closeBtn = document.getElementById('close-chat');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeChat();
            });
        }
        
        // Кнопка сворачивания
        const minimizeBtn = document.getElementById('minimize-chat');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                this.minimizeChat();
            });
        }
        
        // Кнопка восстановления
        const restoreBtn = document.getElementById('restore-chat');
        if (restoreBtn) {
            restoreBtn.addEventListener('click', () => {
                this.restoreChat();
            });
        }
        
        // Отправка сообщения
        const sendBtn = document.getElementById('send-button');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }
        
        // Отправка по Enter (Shift+Enter для новой строки)
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            // Автоматическое изменение высоты textarea
            messageInput.addEventListener('input', () => {
                this.adjustTextareaHeight();
            });
        }
        
        // Закрытие по клику вне чата
        document.addEventListener('click', (e) => {
            const widget = document.getElementById('chat-widget');
            if (widget && !widget.contains(e.target)) {
                this.hideNotificationBadge();
            }
        });
    }
    
    connectWebSocket() {
        const wsUrl = `${this.config.serverUrl}/ws/${this.userId}`;
        
        this.websocket = new WebSocket(wsUrl);
        
        this.websocket.onopen = () => {
            console.log('WebSocket соединение установлено');
            this.isConnected = true;
            this.updateStatus('online');
        };
        
        this.websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleIncomingMessage(data);
        };
        
        this.websocket.onclose = () => {
            console.log('WebSocket соединение закрыто');
            this.isConnected = false;
            this.updateStatus('offline');
            setTimeout(() => this.connectWebSocket(), 5000);
        };
        
        this.websocket.onerror = (error) => {
            console.error('WebSocket ошибка:', error);
            this.updateStatus('error');
        };
    }
    
    updateStatus(status) {
        const statusElement = document.querySelector('.minimized-status');
        if (statusElement) {
            switch (status) {
                case 'online':
                    statusElement.textContent = 'Онлайн';
                    statusElement.style.color = '#27ae60';
                    break;
                case 'offline':
                    statusElement.textContent = 'Переподключение...';
                    statusElement.style.color = '#f39c12';
                    break;
                case 'error':
                    statusElement.textContent = 'Ошибка подключения';
                    statusElement.style.color = '#e74c3c';
                    break;
            }
        }
    }
    
    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        const minimizedChat = document.getElementById('minimized-chat');
        
        if (this.isMinimized) {
            this.restoreChat();
        } else {
            if (chatWindow) chatWindow.classList.toggle('hidden');
            if (minimizedChat) minimizedChat.classList.add('hidden');
            this.hideNotificationBadge();
            
            if (chatWindow && !chatWindow.classList.contains('hidden')) {
                this.focusInput();
                this.scrollToBottom();
            }
        }
    }
    
    minimizeChat() {
        const chatWindow = document.getElementById('chat-window');
        const minimizedChat = document.getElementById('minimized-chat');
        
        if (chatWindow) chatWindow.classList.add('hidden');
        if (minimizedChat) minimizedChat.classList.remove('hidden');
        this.isMinimized = true;
    }
    
    restoreChat() {
        const chatWindow = document.getElementById('chat-window');
        const minimizedChat = document.getElementById('minimized-chat');
        
        if (minimizedChat) minimizedChat.classList.add('hidden');
        if (chatWindow) chatWindow.classList.remove('hidden');
        this.isMinimized = false;
        this.focusInput();
        this.scrollToBottom();
    }
    
    closeChat() {
        const chatWindow = document.getElementById('chat-window');
        const minimizedChat = document.getElementById('minimized-chat');
        
        if (chatWindow) chatWindow.classList.add('hidden');
        if (minimizedChat) minimizedChat.classList.add('hidden');
        this.isMinimized = false;
    }
    
    sendMessage() {
        const messageInput = document.getElementById('message-input');
        if (!messageInput) return;
        
        const message = messageInput.value.trim();
        if (!message) return;
        
        // Добавляем сообщение в чат
        this.addMessage(message, 'user');
        
        // Отправляем через WebSocket
        if (this.isConnected && this.websocket) {
            const messageData = {
                type: 'message',
                message: message,
                user_info: this.getUserInfo()
            };
            this.websocket.send(JSON.stringify(messageData));
        }
        
        // Очищаем поле ввода
        messageInput.value = '';
        this.adjustTextareaHeight();
    }
    
    handleIncomingMessage(data) {
        if (data.type === 'message') {
            this.addMessage(data.message, 'agent');
            this.showNotification();
        } else if (data.type === 'typing') {
            this.showTypingIndicator();
        } else if (data.type === 'stop_typing') {
            this.hideTypingIndicator();
        }
    }
    
    addMessage(text, sender) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        // Создаем аватар
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (sender === 'agent') {
            avatarDiv.innerHTML = `<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM2NjdFRUEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMS43OS00LTQtNC00IDQgMCAyLjIxIDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="${this.config.agentName}">`;
        } else {
            avatarDiv.innerHTML = `<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM5NTNhZmEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTQtMS43OS00LTQtNC00IDQgMCAyLjIxIDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=" alt="Вы">`;
        }
        
        // Создаем контент сообщения
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.innerHTML = this.formatMessage(text);
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getCurrentTime();
        
        bubbleDiv.appendChild(textDiv);
        bubbleDiv.appendChild(timeDiv);
        contentDiv.appendChild(bubbleDiv);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        this.messages.push({ text, sender, time: new Date() });
        
        this.scrollToBottom();
    }
    
    formatMessage(text) {
        // Поддержка эмодзи и ссылок
        return text
            .replace(/\n/g, '<br>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: inherit; text-decoration: underline;">$1</a>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }
    
    showTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.classList.remove('hidden');
            this.scrollToBottom();
        }
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.classList.add('hidden');
        }
    }
    
    showNotification() {
        const chatWindow = document.getElementById('chat-window');
        const notificationBadge = document.getElementById('notification-badge');
        
        if (chatWindow && chatWindow.classList.contains('hidden')) {
            this.unreadCount++;
            if (notificationBadge) {
                notificationBadge.textContent = this.unreadCount;
                notificationBadge.classList.remove('hidden');
            }
        }
    }
    
    hideNotificationBadge() {
        this.unreadCount = 0;
        const notificationBadge = document.getElementById('notification-badge');
        if (notificationBadge) {
            notificationBadge.classList.add('hidden');
        }
    }
    
    adjustTextareaHeight() {
        const textarea = document.getElementById('message-input');
        if (!textarea) return;
        
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
    
    focusInput() {
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.focus();
        }
    }
    
    scrollToBottom() {
        setTimeout(() => {
            const chatMessages = document.getElementById('chat-messages');
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }, 100);
    }
    
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    getUserInfo() {
        return {
            name: this.getCookie('user_name') || null,
            email: this.getCookie('user_email') || null,
            phone: this.getCookie('user_phone') || null,
            page: window.location.href,
            user_agent: navigator.userAgent,
            referrer: document.referrer
        };
    }
    
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
}

// Инициализация виджета
document.addEventListener('DOMContentLoaded', () => {
    new ModernChatWidget({
        agentName: 'Александра',
        responseTime: '26 секунд',
        welcomeMessage: 'Привет, чем я могу вам помочь?'
    });
}); 