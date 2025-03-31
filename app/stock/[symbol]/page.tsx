'use client'

import { useParams } from 'next/navigation'
import Navigation from '../../components/Navigation'

export default function StockPage() {
  const params = useParams()
  const symbol = params.symbol as string

  return (
    <main className="flex min-h-screen bg-gray-950">
      <Navigation />
      
      <div className="ml-16 flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold">${symbol}</h1>
                <p className="text-gray-400 mt-2">Technology • NASDAQ</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">$175.84</div>
                <div className="text-green-500 text-lg">+2.45%</div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Price Chart</h2>
                <div className="h-96 bg-gray-800 rounded-lg"></div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Community Sentiment</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                          <div className="ml-3">
                            <div className="font-medium">User{i}</div>
                            <div className="text-sm text-gray-400">2 hours ago</div>
                          </div>
                        </div>
                        <div className="text-green-500">+75 Sentiment</div>
                      </div>
                      <p className="text-gray-300">
                        Sample sentiment analysis comment about the stock...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Key Statistics</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Market Cap', value: '$2.8T' },
                    { label: 'P/E Ratio', value: '28.5' },
                    { label: '52 Week High', value: '$198.23' },
                    { label: '52 Week Low', value: '$124.17' },
                    { label: 'Volume', value: '64.2M' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex justify-between">
                      <span className="text-gray-400">{stat.label}</span>
                      <span className="font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">AI Analysis</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Sentiment Score</span>
                    <span className="text-green-500 font-bold">85</span>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-300">
                      AI-generated analysis of current market sentiment and potential trends...
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 