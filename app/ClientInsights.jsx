'use client';
import { useState } from 'react';

export default function ClientInsights({ insightsData }) {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {insightsData.map((item, i) => (
        <Card key={i} post={item} />
      ))}
    </div>
  );
}

function Card({ post }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg shadow-sm border border-gray-200 p-3 bg-white">
      <h2 className="text-lg font-semibold mb-1">{post.title}</h2>

      <div className="mb-2">
        <p className="text-gray-600 text-sm whitespace-pre-line">
          {expanded ? post.text : post.text.slice(0, 200) + (post.text.length > 200 ? '...' : '')}
        </p>
        {post.text.length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-xs text-blue-500 hover:underline"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      <div className="border-t border-dashed border-gray-300 my-2" />

      <ul className="list-disc list-inside text-sm mb-2">
        {post.insights.map((insight, idx) => (
          <li key={idx} className="text-gray-800">{insight}</li>
        ))}
      </ul>

      <p className="text-xs text-blue-600">
        <strong>Tickers:</strong>{' '}
        {post.tickers.map((ticker, idx) => (
          <a
            key={idx}
            href={`/stock/${ticker}?company_description=${encodeURIComponent(post.text.slice(0, 50) + (post.text.length > 200 ? '...' : '') || '')}&reddit_description=${encodeURIComponent(post.insights || '')}&sentiment_score=${post.sentiment || 0}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline mr-1"
          >
            {ticker}
          </a>
        ))}
      </p>
    </div>
  );
}
