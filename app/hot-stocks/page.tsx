import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'

const mockStocks = [
  { id: 1, symbol: '$STOCK', description: 'New product released by $STOCK today has led to investor interest in the stock. Click for more information!' },
  { id: 2, symbol: '$STOCK', description: 'Recent earnings report shows promising growth' },
  { id: 3, symbol: '$STOCK', description: 'Analyst upgrades drive stock momentum' },
  { id: 4, symbol: '$STOCK', description: 'Market sentiment shifts positively' },
  { id: 5, symbol: '$STOCK', description: 'Technical indicators suggest bullish trend' },
  { id: 6, symbol: '$STOCK', description: 'Partnership announcement boosts investor confidence' },
  { id: 7, symbol: '$STOCK', description: 'Industry leadership position strengthens' },
  { id: 8, symbol: '$STOCK', description: 'Innovation in product development' },
  { id: 9, symbol: '$STOCK', description: 'Strategic acquisition completed successfully' }
];

export default function HotStocksPage() {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 ml-12">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <Logo />
          </div>

          <div className="bg-black">
            <h1 className="text-4xl font-bold text-gray-400 mb-6">HOT STOCKS</h1>
            <div className="space-y-3">
              {mockStocks.map((stock) => (
                <button
                  key={stock.id}
                  className="w-full bg-white rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-black">{stock.id}. {stock.symbol}</h3>
                      <p className="text-gray-600 mt-1">{stock.description}</p>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-gray-400 transform rotate-180" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 