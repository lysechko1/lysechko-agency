# 🚀 Lysechko Agency

Performance-driven digital marketing agency website.

## ✨ Features

- **Modern Design**: Beautiful, responsive design with Tailwind CSS
- **Multi-language**: Russian and English support
- **Performance**: Optimized for Core Web Vitals
- **SEO**: Built with Next.js 14 and App Router

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
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
│   └── ui/               # UI components
├── lib/                   # Utilities and configurations
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Optional: GTM ID
NEXT_PUBLIC_GTM_ID=GTM-K5VKJKK2
```

## 📊 Analytics

Google Tag Manager is integrated for tracking user interactions and conversions.

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