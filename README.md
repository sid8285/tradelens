# Trade Lens - AI-Powered Stock Analysis Platform

Trade Lens is a modern web application that provides real-time stock analysis and market insights powered by AI. The platform combines traditional market data with sentiment analysis from various online communities to give users a comprehensive view of market trends and opportunities.

## Features

- **Real-time Stock Tracking**: Monitor stock prices and market movements in real-time
- **AI-Powered Sentiment Analysis**: Get insights from social media and community discussions
- **Interactive Dashboard**: User-friendly interface for tracking your favorite stocks
- **Detailed Stock Analysis**: Comprehensive view of individual stocks with technical indicators
- **Community Insights**: Access curated discussions and sentiment from various online sources
- **Premium Features**: Subscribe to access advanced analytics and real-time alerts

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Built-in Next.js authentication
- **Payment Processing**: Stripe
- **UI Components**: Custom components with Lucide icons

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tradelens.git
   cd tradelens
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
tradelens/
├── app/
│   ├── components/    # Reusable UI components
│   ├── lib/          # Utility functions and helpers
│   ├── styles/       # Global styles and Tailwind config
│   └── pages/        # Application pages and routes
├── public/           # Static assets
└── package.json      # Project dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


Test!

