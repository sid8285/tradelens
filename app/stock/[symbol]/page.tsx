'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '../../components/Header'

interface StockPageProps {
  params: {
    symbol: string
  }
}

export default function StockPage({ params }: StockPageProps) {
  const { symbol } = params;
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link 
            href="/hot-stocks" 
            className="inline-flex items-center text-black hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Hot Stocks
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-black">${symbol}</h1>
              <p className="text-gray-400 mt-2">AI Generated description of company</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-medium text-black">Overall Sentiment Score:</div>
              <div className="text-4xl font-bold text-black mt-1">49</div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-medium text-black mb-4">AI Generated description of the stock...</h2>
          <div className="h-64 bg-gray-100 rounded-lg"></div>
        </div>

        {/* Insights Section */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-6">Insights</h2>
          <p className="text-gray-400 mb-6">Community Driven</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reddit Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <h3 className="text-lg font-medium text-black">Reddit</h3>
              </div>
              <p className="text-gray-600">AI Generated summary from curated Reddit communities</p>
            </div>

            {/* Discord Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <h3 className="text-lg font-medium text-black">Discord</h3>
              </div>
              <p className="text-gray-600">AI Generated summary from curated Reddit communities</p>
            </div>

            {/* Blogs Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <h3 className="text-lg font-medium text-black">Blogs/Etc.</h3>
              </div>
              <p className="text-gray-600">AI Generated summary from blogs and other curated authors</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 