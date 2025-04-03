import StockInsightCard from './components/StockInsightCard'
import Header from './components/Header'

// Function to format the current date
function getCurrentDate() {
  const date = new Date()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

const mockData = {
  hotStocks: {
    title: `Hot Stocks - ${getCurrentDate()}`,
    type: 'article' as const,
    source: {
      type: 'AI' as const,
      description: 'Summary of hot stocks and their pertinent news'
    }
  },
  marketOverview: {
    type: 'stats' as const,
    title: 'Market Overview',
    stockData: {
      symbol: 'MARKET',
      price: 36789.45,
      stats: [
        { label: 'S&P 500', value: '+1.2%' },
        { label: 'NASDAQ', value: '+0.8%' },
        { label: 'DOW', value: '+1.5%' },
        { label: 'VIX', value: '15.2' }
      ]
    }
  },
  trendingDiscussions: {
    title: 'Trending Discussions',
    type: 'community' as const,
    source: {
      type: 'AI' as const,
      description: 'Most active community discussions'
    },
    content: 'AI-curated insights from trending market discussions across platforms'
  },
  articles: [
    {
      title: '$STOCK is doomed/underrated/etc.',
      type: 'article' as const,
      source: {
        type: 'AM' as const,
        description: 'You follow this author.'
      },
      content: 'Article content from "reputable" actors in popular online communities',
      authorName: 'Author Last Name'
    }
  ],
  latestNews: {
    title: 'Breaking: Fed Announces New Policy',
    type: 'article' as const,
    source: {
      type: 'AM' as const,
      description: 'Latest market updates'
    },
    content: 'Federal Reserve announces new monetary policy guidelines...',
    authorName: 'Financial Times'
  },
  communityInsights: [
    {
      title: '$STOCK is doomed/underrated/etc.',
      type: 'community' as const,
      source: {
        type: 'AI' as const,
        description: 'You follow this stock.'
      }
    },
    {
      title: '$STOCK is doomed/underrated/etc.',
      type: 'community' as const,
      source: {
        type: 'AI' as const,
        description: 'Recommended stock'
      }
    }
  ],
  stockStats: {
    type: 'stats' as const,
    title: 'Stock Statistics',
    stockData: {
      symbol: 'STOCK',
      price: 50.38,
      stats: [
        { label: 'PE Ratio:', value: '24.5' },
        { label: '30 DAY LOW', value: '$45.20' },
        { label: '30 DAY HIGH', value: '$58.90' },
        { label: 'ANALYST OUTLOOK', value: 'Positive' }
      ]
    }
  },
  watchlistPerformance: {
    type: 'stats' as const,
    title: 'Watchlist Performance',
    stockData: {
      symbol: 'WATCH',
      price: 0,
      stats: [
        { label: 'AAPL', value: '+2.3%' },
        { label: 'MSFT', value: '+1.8%' },
        { label: 'GOOGL', value: '+0.9%' },
        { label: 'AMZN', value: '-0.5%' }
      ]
    }
  },
  topAnalysts: {
    title: 'Top Analyst Picks',
    type: 'article' as const,
    source: {
      type: 'AM' as const,
      description: 'Curated from leading analysts'
    },
    content: 'Weekly roundup of top analyst stock recommendations and insights',
    authorName: 'Market Analysis Team'
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 1 */}
          <div className="bg-white rounded-xl p-6">
            <StockInsightCard {...mockData.hotStocks} isHotStocks={true} />
          </div>
          <div className="bg-white rounded-xl p-6">
            <StockInsightCard {...mockData.marketOverview} />
          </div>
          <div className="bg-white rounded-xl p-6">
            <StockInsightCard {...mockData.trendingDiscussions} />
          </div>

          {/* Row 2 */}
          <div className="bg-white rounded-xl p-6">
            <StockInsightCard {...mockData.articles[0]} />
          </div>
          <div className="bg-white rounded-xl p-6">
            <StockInsightCard {...mockData.latestNews} />
          </div>
          <div className="bg-white rounded-xl p-6">
            <StockInsightCard {...mockData.communityInsights[0]} />
          </div>

          {/* Row 3 */}
          <div className="bg-white rounded-xl p-6">
            <StockInsightCard {...mockData.stockStats} />
          </div>
          <div className="bg-white rounded-xl p-6">
            <StockInsightCard {...mockData.watchlistPerformance} />
          </div>
          <div className="bg-white rounded-xl p-6">
            <StockInsightCard {...mockData.topAnalysts} />
          </div>
        </div>
      </main>
    </div>
  )
} 