import Navigation from './components/Navigation'
import StockInsightCard from './components/StockInsightCard'

const mockData = {
  hotStocks: {
    title: 'Hot Stocks - March 3, 2025',
    type: 'article' as const,
    source: {
      type: 'AI' as const,
      description: 'Summary of hot stocks and their pertinent news'
    }
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
        { label: 'ANALYST OUTLOOK', value: 'Positive' },
        { label: 'etc.', value: '-' }
      ]
    }
  }
};

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 ml-12">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <StockInsightCard {...mockData.hotStocks} isHotStocks={true} />
            </div>
            {mockData.articles.map((article, index) => (
              <div key={`article-${index}`} className="bg-white rounded-xl p-6">
                <StockInsightCard key={`article-${index}`} {...article} />
              </div>
            ))}
            {mockData.communityInsights.map((insight, index) => (
              <div key={`insight-${index}`} className="bg-white rounded-xl p-6">
                <StockInsightCard key={`insight-${index}`} {...insight} />
              </div>
            ))}
            <div className="bg-white rounded-xl p-6">
              <StockInsightCard {...mockData.stockStats} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 