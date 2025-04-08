'use client';
import { useState } from 'react';

export default function ClientInsights({ insightsData }) {
  if (!insightsData || insightsData.length === 0) {
    return (
      <div className="text-white text-center mt-10">
        <h2 className="text-2xl font-bold">No insights available</h2>
        <p className="text-gray-400 mt-2">Hugging Face may not have returned valid JSON.</p>
      </div>
    );
  }

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
            href={`https://www.google.com/finance/quote/${ticker}:NASDAQ`}
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
