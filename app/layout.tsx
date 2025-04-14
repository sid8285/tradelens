import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trade Lens - Smart Stock Analysis Platform',
  description: 'Real-time stock analysis and market insights powered by AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen`}>
        <nav className="bg-gray-900 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              TradeLens
            </Link>
            <div className="space-x-4">
              <Link 
                href="/hot-stocks" 
                className="hover:text-blue-400 transition-colors"
              >
                Hot Stocks
              </Link>
            </div>
            <div className="space-x-4">
              <Link 
                href="/payment" 
                className="hover:text-blue-400 transition-colors"
              >
                Payment
              </Link>
            </div>
            <div className="space-x-4">
              <Link 
                href="/login" 
                className="hover:text-blue-400 transition-colors"
              >
                Logout
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
} 