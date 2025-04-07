import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/Header'

const mockStocks = [
  { id: 1, symbol: 'AAPL', description: 'New product released by Apple today has led to investor interest in the stock. Click for more information!' },
  { id: 2, symbol: 'TSLA', description: 'Recent earnings report shows promising growth' },
  { id: 3, symbol: 'NVDA', description: 'Analyst upgrades drive stock momentum' },
  { id: 4, symbol: 'META', description: 'Market sentiment shifts positively' },
  { id: 5, symbol: 'MSFT', description: 'Technical indicators suggest bullish trend' },
  { id: 6, symbol: 'AMZN', description: 'Partnership announcement boosts investor confidence' },
  { id: 7, symbol: 'GOOGL', description: 'Industry leadership position strengthens' },
  { id: 8, symbol: 'AMD', description: 'Innovation in product development' },
  { id: 9, symbol: 'NFLX', description: 'Strategic acquisition completed successfully' }
];

export default function HotStocksPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-400 mb-6">HOT STOCKS</h1>
          <div className="space-y-3">
            {mockStocks.map((stock) => (
              <Link
                key={stock.id}
                href={`/stock/${stock.symbol}`}
                className="block w-full"
              >
                <div className="w-full bg-white rounded-lg p-4 text-left hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-black">{stock.id}. ${stock.symbol}</h3>
                      <p className="text-gray-600 mt-1">{stock.description}</p>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 