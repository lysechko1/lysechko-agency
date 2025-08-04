# 🚀 Lysechko Agency

Performance-driven digital marketing agency website with integrated chat system.

## ✨ Features

- **Modern Design**: Beautiful, responsive design with Tailwind CSS
- **Multi-language**: Russian and English support
- **Live Chat**: Integrated chat system with Telegram integration
- **Performance**: Optimized for Core Web Vitals
- **SEO**: Built with Next.js 14 and App Router

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Chat**: Custom WebSocket integration
- **Analytics**: Google Tag Manager
- **Deployment**: GitHub Pages / Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/lysechko1/lysechko-agency.git
cd lysechko-agency

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

### Build for Production

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## 📱 Chat Integration

The website includes a fully functional chat system:

- **Server**: `http://46.202.155.177:8080`
- **Features**: Real-time messaging, Telegram integration
- **Languages**: Russian and English support
- **Analytics**: GTM events tracking

### Chat Components

- `ChatProvider`: Main context provider
- `ChatButton`: Desktop chat button
- `ChatMobileButton`: Mobile chat button
- `ChatStatus`: Status indicator
- `ChatLoader`: Loading indicator

## 🌐 Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages:

1. Push to `main` branch
2. GitHub Actions will build and deploy automatically
3. Site will be available at: `https://lysechko1.github.io/lysechko-agency`

### Vercel

For Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Set environment variables if needed
3. Deploy automatically on push

## 📁 Project Structure

```
lysechko-agency/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── en/                # English pages
│   └── ru/                # Russian pages
├── components/            # React components
│   ├── chat/             # Chat system components
│   └── ui/               # UI components
├── lib/                   # Utilities and configurations
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Optional: Custom chat server URL
NEXT_PUBLIC_CHAT_SERVER=http://46.202.155.177:8080

# Optional: GTM ID
NEXT_PUBLIC_GTM_ID=GTM-K5VKJKK2
```

### Chat Configuration

The chat system is pre-configured but can be customized:

- Server URL: `http://46.202.155.177:8080`
- WebSocket: `ws://46.202.155.177:8080/ws/`
- Telegram Bot: `@chat_lysechko_agency_bot`

## 📊 Analytics

Google Tag Manager is integrated with the following events:

- `chat_loaded`: Chat widget loaded
- `chat_opened`: Chat opened by user
- `chat_closed`: Chat closed by user
- `chat_message_sent`: Message sent

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private and proprietary to Lysechko Agency.

## 📞 Support

For support or questions:
- Email: [contact@lysechko.agency]
- Website: [https://lysechko.agency]

---

**Built with ❤️ by Lysechko Agency** 