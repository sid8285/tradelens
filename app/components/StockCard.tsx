interface StockCardProps {
  symbol: string;
  price: number;
  sentiment: number;
  description: string;
  change: number;
}

export default function StockCard({ symbol, price, sentiment, description, change }: StockCardProps) {
  const sentimentColor = sentiment >= 70 ? 'text-green-500' : sentiment >= 40 ? 'text-yellow-500' : 'text-red-500';
  const priceChangeColor = change >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">${symbol}</h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${price.toFixed(2)}</div>
          <div className={`${priceChangeColor} text-sm`}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="text-sm text-gray-400">Sentiment Score</div>
          <div className={`${sentimentColor} ml-2 font-bold`}>{sentiment}</div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  )
} 