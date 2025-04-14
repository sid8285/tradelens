import praw
import os
import requests
import argparse
from datetime import datetime, timedelta
import time
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def parse_arguments():
	parser = argparse.ArgumentParser(description='Scrape Reddit for stock ticker information and summarize using an LLM')
	parser.add_argument('ticker', type=str, help='Stock ticker symbol to search for')
	parser.add_argument('--days', type=int, default=7, help='Number of days to look back (default: 7)')
	parser.add_argument('--limit', type=int, default=25, help='Maximum number of posts to retrieve per subreddit (default: 25)')
	parser.add_argument('--subreddits', type=str, default='wallstreetbets,stocks,investing', 
						help='Comma-separated list of subreddits to search (default: wallstreetbets,stocks,investing)')
	return parser.parse_args()

def initialize_reddit_client():
	"""Initialize the Reddit client using PRAW."""
	try:
		return praw.Reddit(
			client_id=os.getenv('REDDIT_CLIENT_ID'),
			client_secret=os.getenv('REDDIT_SECRET'),
			user_agent=os.getenv('REDDIT_USER_AGENT', 'StockSentimentScraper v1.0')
		)
	except Exception as e:
		print(f"Error initializing Reddit client: {e}")
		exit(1)

def scrape_reddit_for_ticker(reddit, ticker, subreddits, days_back, posts_limit):
	"""Scrape Reddit for posts and comments about the given ticker."""
	results = []
	cutoff_date = datetime.now() - timedelta(days=days_back)
	
	for subreddit_name in subreddits:
		print(f"Searching in r/{subreddit_name}...")
		subreddit = reddit.subreddit(subreddit_name)
		
		# Search for posts containing the ticker
		search_query = f"{ticker}"
		for submission in subreddit.search(search_query, limit=posts_limit, sort='new'):
			post_date = datetime.fromtimestamp(submission.created_utc)
			if post_date >= cutoff_date:
				post_data = {
					'type': 'post',
					'title': submission.title,
					'content': submission.selftext[:500] + '...' if len(submission.selftext) > 500 else submission.selftext,
					'author': str(submission.author),
					'score': submission.score,
					'date': post_date.strftime('%Y-%m-%d'),
					'url': submission.url,
					'comments': []
				}
				
				# Get top comments
				submission.comments.replace_more(limit=0)
				for comment in submission.comments[:10]:
					if ticker.upper() in comment.body.upper():
						post_data['comments'].append({
							'author': str(comment.author),
							'content': comment.body[:300] + '...' if len(comment.body) > 300 else comment.body,
							'score': comment.score
						})
				
				results.append(post_data)
				
	return results

def get_summary_from_llm(ticker, reddit_data, llm_provider='openai'):
	"""Get a summary of the Reddit data using an LLM API."""
	if llm_provider == 'openai':
		return summarize_with_openai(ticker, reddit_data)
	elif llm_provider == 'anthropic':
		return summarize_with_anthropic(ticker, reddit_data)
	else:
		return "Unsupported LLM provider"

def summarize_with_openai(ticker, reddit_data):
	"""Summarize the data using OpenAI's API."""
	try:
		openai_api_key = os.getenv('OPENAI_KEY')
		if not openai_api_key:
			return "OpenAI API key not found in environment variables."
		
		# Format the data for the prompt
		formatted_data = format_data_for_summary(ticker, reddit_data)
		
		headers = {
			"Content-Type": "application/json",
			"Authorization": f"Bearer {openai_api_key}"
		}
		
		payload = {
			"model": "gpt-4",
			"messages": [
				{
					"role": "system",
					"content": "You are a financial analyst specializing in stock sentiment analysis. Summarize the Reddit data to provide insights about the stock's sentiment, key points mentioned, and overall sentiment (bullish, bearish, or neutral)."
				},
				{
					"role": "user",
					"content": formatted_data
				}
			],
			"temperature": 0.3
		}
		
		response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
		
		if response.status_code == 200:
			return response.json()["choices"][0]["message"]["content"]
		else:
			return f"Error from OpenAI API: {response.text}"
			
	except Exception as e:
		return f"Error using OpenAI API: {e}"

def summarize_with_anthropic(ticker, reddit_data):
	"""Summarize the data using Anthropic's Claude API."""
	try:
		anthropic_api_key = os.getenv('ANTHROPIC_API_KEY')
		if not anthropic_api_key:
			return "Anthropic API key not found in environment variables."
		
		# Format the data for the prompt
		formatted_data = format_data_for_summary(ticker, reddit_data)
		
		headers = {
			"Content-Type": "application/json",
			"x-api-key": anthropic_api_key,
			"anthropic-version": "2023-06-01"
		}
		
		payload = {
			"model": "claude-3-sonnet-20240229",
			"max_tokens": 1000,
			"messages": [
				{
					"role": "system",
					"content": "You are a financial analyst specializing in stock sentiment analysis. Summarize the Reddit data to provide insights about the stock's sentiment, key points mentioned, and overall sentiment (bullish, bearish, or neutral)."
				},
				{
					"role": "user",
					"content": formatted_data
				}
			],
			"temperature": 0.3
		}
		
		response = requests.post("https://api.anthropic.com/v1/messages", headers=headers, json=payload)
		
		if response.status_code == 200:
			return response.json()["content"][0]["text"]
		else:
			return f"Error from Anthropic API: {response.text}"
			
	except Exception as e:
		return f"Error using Anthropic API: {e}"

def format_data_for_summary(ticker, reddit_data):
	"""Format the Reddit data into a structured prompt for the LLM."""
	formatted_text = f"Please analyze recent Reddit discussions about {ticker} stock. Here's the data:\n\n"
	
	for i, post in enumerate(reddit_data):
		formatted_text += f"Post {i+1}: {post['title']}\n"
		formatted_text += f"Date: {post['date']}, Score: {post['score']}, Author: {post['author']}\n"
		formatted_text += f"Content: {post['content']}\n"
		
		if post['comments']:
			formatted_text += "Top relevant comments:\n"
			for j, comment in enumerate(post['comments']):
				formatted_text += f"  - Comment {j+1} (Score: {comment['score']}): {comment['content']}\n"
		
		formatted_text += "\n" + "-"*50 + "\n\n"
	
	formatted_text += f"""
Based on the above Reddit posts and comments about {ticker}, please provide:
1. A brief summary of the key points being discussed
2. The overall sentiment (bullish, bearish, or neutral)
3. Any major concerns or positive points mentioned multiple times
4. Key financial or business aspects mentioned

Please note that Reddit discussions should not be considered financial advice.
"""
	return formatted_text

def main():
	args = parse_arguments()
	ticker = args.ticker.upper()
	days_back = args.days
	posts_limit = args.limit
	subreddits = args.subreddits.split(',')
	
	print(f"Starting search for {ticker} posts from the past {days_back} days...")
	print(f"Searching in subreddits: {', '.join(subreddits)}")
	
	# Initialize Reddit client
	reddit = initialize_reddit_client()
	
	# Scrape Reddit
	start_time = time.time()
	reddit_data = scrape_reddit_for_ticker(reddit, ticker, subreddits, days_back, posts_limit)
	scrape_time = time.time() - start_time
	
	if not reddit_data:
		print(f"No recent posts found for {ticker} in the specified subreddits.")
		return
	
	print(f"Found {len(reddit_data)} posts related to {ticker}.")
	print(f"Scraping completed in {scrape_time:.2f} seconds.")
	print("Sending data to LLM for analysis...")
	
	# Get summary from LLM
	start_time = time.time()
	llm_provider = os.getenv('LLM_PROVIDER', 'openai')
	summary = get_summary_from_llm(ticker, reddit_data, llm_provider)
	summary_time = time.time() - start_time
	
	print(f"Analysis completed in {summary_time:.2f} seconds.")
	print("\n" + "="*80 + "\n")
	print(f"SUMMARY FOR {ticker}:")
	print("\n" + "="*80 + "\n")
	print(summary)
	print("\n" + "="*80 + "\n")
	
	# Save to file
	filename = f"{ticker}_reddit_analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
	with open(filename, 'w', encoding='utf-8') as f:
		f.write(f"REDDIT ANALYSIS FOR {ticker}\n")
		f.write(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
		f.write(f"Searched {len(reddit_data)} posts from the past {days_back} days in r/{', r/'.join(subreddits)}\n\n")
		f.write("="*80 + "\n\n")
		f.write(summary)
		f.write("\n\n" + "="*80 + "\n\n")
		f.write("RAW DATA:\n\n")
		for i, post in enumerate(reddit_data):
			f.write(f"Post {i+1}: {post['title']}\n")
			f.write(f"Date: {post['date']}, Score: {post['score']}, Author: {post['author']}\n")
			f.write(f"URL: {post['url']}\n")
			f.write(f"Content: {post['content']}\n")
			
			if post['comments']:
				f.write("Relevant comments:\n")
				for j, comment in enumerate(post['comments']):
					f.write(f"  - Comment {j+1} (Score: {comment['score']}): {comment['content']}\n")
			
			f.write("\n" + "-"*50 + "\n\n")
	
	print(f"Analysis saved to {filename}")

if __name__ == "__main__":
	main()
