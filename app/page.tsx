import {fetchInsights} from "../lib/getInsights"
import ClientInsights from './ClientInsights';

export default async function Home() {
  const insightsData = await fetchInsights(); // run server-side
  return <ClientInsights insightsData={insightsData} />;
}
//'use client'
//import StockInsightCard from './components/StockInsightCard'
//import Header from './components/Header'
//import { RedditPost, convertRedditPostToCard } from './utils/reddit'
//import { fetchInsights } from "../lib/getInsights";
//import { useState} from "react"
//
//// Function to format the current date
//function getCurrentDate() {
//  const date = new Date()
//  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//  const month = months[date.getMonth()]
//  const day = date.getDate()
//  const year = date.getFullYear()
//  return `${month} ${day}, ${year}`
//}
//
//// Static mock data as fallback
//const mockData = {
//  hotStocks: {
//    title: `Hot Stocks - ${getCurrentDate()}`,
//    type: 'article' as const,
//    source: {
//      type: 'AI' as const,
//      description: 'Summary of hot stocks and their pertinent news'
//    }
//  },
//  marketOverview: {
//    type: 'stats' as const,
//    title: 'Market Overview',
//    source: {
//      type: 'AI' as const,
//      description: 'Market indices overview'
//    },
//    stockData: {
//      symbol: 'MARKET',
//      price: 36789.45,
//      stats: [
//        { label: 'S&P 500', value: '+1.2%' },
//        { label: 'NASDAQ', value: '+0.8%' },
//        { label: 'DOW', value: '+1.5%' },
//        { label: 'VIX', value: '15.2' }
//      ]
//    }
//  },
//  trendingDiscussions: {
//    title: 'Trending Discussions',
//    type: 'community' as const,
//    source: {
//      type: 'AI' as const,
//      description: 'Most active community discussions'
//    },
//    content: 'AI-curated insights from trending market discussions across platforms'
//  },
//  articles: [
//    {
//      title: '$STOCK is doomed/underrated/etc.',
//      type: 'article' as const,
//      source: {
//        type: 'AM' as const,
//        description: 'You follow this author.'
//      },
//      content: 'Article content from "reputable" actors in popular online communities',
//      authorName: 'Author Last Name'
//    }
//  ],
//  latestNews: {
//    title: 'Breaking: Fed Announces New Policy',
//    type: 'article' as const,
//    source: {
//      type: 'AM' as const,
//      description: 'Latest market updates'
//    },
//    content: 'Federal Reserve announces new monetary policy guidelines...',
//    authorName: 'Financial Times'
//  },
//  communityInsights: [
//    {
//      title: '$STOCK is doomed/underrated/etc.',
//      type: 'community' as const,
//      source: {
//        type: 'AI' as const,
//        description: 'You follow this stock.'
//      }
//    },
//    {
//      title: '$STOCK is doomed/underrated/etc.',
//      type: 'community' as const,
//      source: {
//        type: 'AI' as const,
//        description: 'Recommended stock'
//      }
//    }
//  ],
//  stockStats: {
//    type: 'stats' as const,
//    title: 'Stock Statistics',
//    source: {
//      type: 'AI' as const,
//      description: 'Stock performance metrics'
//    },
//    stockData: {
//      symbol: 'STOCK',
//      price: 50.38,
//      stats: [
//        { label: 'PE Ratio:', value: '24.5' },
//        { label: '30 DAY LOW', value: '$45.20' },
//        { label: '30 DAY HIGH', value: '$58.90' },
//        { label: 'ANALYST OUTLOOK', value: 'Positive' }
//      ]
//    }
//  },
//  watchlistPerformance: {
//    type: 'stats' as const,
//    title: 'Watchlist Performance',
//    source: {
//      type: 'AI' as const,
//      description: 'Tracked stocks performance'
//    },
//    stockData: {
//      symbol: 'WATCH',
//      price: 0,
//      stats: [
//        { label: 'AAPL', value: '+2.3%' },
//        { label: 'MSFT', value: '+1.8%' },
//        { label: 'GOOGL', value: '+0.9%' },
//        { label: 'AMZN', value: '-0.5%' }
//      ]
//    }
//  },
//  topAnalysts: {
//    title: 'Top Analyst Picks',
//    type: 'article' as const,
//    source: {
//      type: 'AM' as const,
//      description: 'Curated from leading analysts'
//    },
//    content: 'Weekly roundup of top analyst stock recommendations and insights',
//    authorName: 'Market Analysis Team'
//  }
//};
//
//// Props for the Home component
//interface HomeProps {
//  redditData?: {
//    wallstreetbets?: RedditPost[]
//    investing?: RedditPost[]
//    stocks?: RedditPost[]
//  }
//}
//
//export default async function Home() {
//  const insightsData = await fetchInsights();
//  return (
//	   <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
//      {insightsData.map((item, i) => (
//        <Card key={i} post={item} />
//      ))}
//    </div>
//  );
//}
//
//function Card({ post }) {
//  const [expanded, setExpanded] = useState(false);
//
//  return (
//    <div className="rounded-xl shadow-md border border-gray-200 p-4 bg-white">
//      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
//
//      {/* Collapsible post text */}
//      <div className="mb-3">
//        <p className="text-gray-600 whitespace-pre-line">
//          {expanded ? post.text : post.text.slice(0, 200) + (post.text.length > 200 ? '...' : '')}
//        </p>
//        {post.text.length > 200 && (
//          <button
//            onClick={() => setExpanded(!expanded)}
//            className="mt-1 text-sm text-blue-500 hover:underline"
//          >
//            {expanded ? 'Show less' : 'Read more'}
//          </button>
//        )}
//      </div>
//
//      {/* Divider */}
//      <div className="border-t border-dashed border-gray-300 my-3" />
//
//      {/* Insights */}
//      <ul className="list-disc list-inside mb-3">
//        {post.insights.map((insight, idx) => (
//          <li key={idx} className="text-gray-800">{insight}</li>
//        ))}
//      </ul>
//
//      {/* Tickers */}
//      <p className="text-sm text-blue-600">
//        <strong>Tickers:</strong>{' '}
//        {post.tickers.map((ticker, idx) => (
//          <a
//            key={idx}
//            href={`https://www.google.com/finance/quote/${ticker}:NASDAQ`}
//            target="_blank"
//            rel="noopener noreferrer"
//            className="hover:underline mr-2"
//          >
//            {ticker}
//          </a>
//        ))}
//      </p>
//    </div>
//  );
//}
