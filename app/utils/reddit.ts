import { StockInsightCardProps } from '../components/StockInsightCard'

// Type for Reddit post data
export interface RedditPost {
  title: string
  selftext: string
  author: string
  score: number
  created_utc: number
  permalink: string
}

// Function to convert Reddit post to our card format
export function convertRedditPostToCard(post: RedditPost): StockInsightCardProps {
  return {
    title: post.title,
    type: 'community',
    source: {
      type: 'AI',
      description: `Posted by u/${post.author}`
    },
    content: post.selftext.substring(0, 200) + '...', // Truncate long posts
    authorName: post.author
  }
} 