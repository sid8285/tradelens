import Link from 'next/link'
import Badge from './Badge';
import { Star } from 'lucide-react';

export type StockInsightCardProps = {
  title: string
  type: 'article' | 'community' | 'stats'
  source: {
    type: 'AI' | 'AM'
    description: string
  }
  content?: string
  authorName?: string
  stockData?: {
    symbol: string
    price: number
    stats: Array<{
      label: string
      value: string
    }>
  }
  isHotStocks?: boolean
}

export default function StockInsightCard({
  type,
  title,
  source,
  content: contentText,
  stockData,
  authorName,
  isHotStocks
}: StockInsightCardProps) {
  const cardContent = (
    <div className="w-full">
      {(type === 'article' || type === 'community') && (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            {isHotStocks ? (
              <Star className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="currentColor" strokeWidth={1.5} />
            ) : (
              source && <Badge type={source.type} />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-medium text-black leading-snug">{title}</h3>
              {source?.description && (
                <p className="text-sm text-gray-400 mt-1">{source.description}</p>
              )}
            </div>
          </div>

          {authorName && (
            <div className="text-sm">
              <span className="text-gray-400">by </span>
              <span className="text-black font-medium">{authorName}</span>
            </div>
          )}

          {contentText && (
            <div className="text-sm text-gray-600">{contentText}</div>
          )}
        </div>
      )}

      {type === 'stats' && stockData && (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-medium text-black">${stockData.symbol}</h3>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-4xl font-medium text-black">${Math.floor(stockData.price)}</span>
              <span className="text-xl text-gray-400">.{(stockData.price % 1).toFixed(2).slice(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            {stockData.stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{stat.label}</span>
                <span className="text-sm font-medium text-black">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return isHotStocks ? (
    <Link href="/hot-stocks" className="block hover:opacity-95 transition-opacity">
      {cardContent}
    </Link>
  ) : cardContent;
} 