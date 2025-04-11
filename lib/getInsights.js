import "dotenv/config"
import { db } from './db';
import { postsTable } from './db/schema';

// in my brnach process.env doesnt exist its roland's information, he or someone with both keys/access can test
const REDDIT_SECRET = process.env.REDDIT_SECRET;
const REDDIT_ID = process.env.REDDIT_CLIENT_ID;
const OPENAI_KEY = process.env.OPENAI_KEY;

const getRedditAccessToken = async () => {
	const credentials = Buffer.from(`${REDDIT_ID}:${REDDIT_SECRET}`).toString('base64');

	const res = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: "POST",
		headers: {
			"Authorization": `Basic ${credentials}`,
			"Content-Type": "application/x-www-form-urlencoded",
			"User-Agent": "Tradelens Script"
		},
		body: "grant_type=client_credentials"
	});

	const data = await res.json();

	const token = data.access_token;
	return token;
};

const getRedditPostsFromSubreddit = async (subredditName, accessToken) => {
	const url = `https://oauth.reddit.com/r/${subredditName}.json`
	const result = await fetch(url, {
		headers: {
			"Authorization": `bearer ${accessToken}`,
			"User-Agent": "Tradelens Script",
		}
	});

	if (result.ok) {
		//console.log("Request was ok");
	} else {
		console.log("Problem with Request");
		console.log(result);
		return
	}

	const body = await result.json();

	const data = body.data;
	const posts = data.children;

	const postCount = posts.length;
	console.log(`${postCount} Posts Returned`);

	const postTexts = [];
	const resultData = [];

	posts.forEach(post => {
		const data = post.data;
		console.log(data.id);
		if (data.stickied) {
			console.log("Stickied post");
			return;
		} else {
			const postData = {
				id: data.id,
				text: data.selftext,
				author: data.author_fullname,
				title: data.title,
				created: data.created,
				num_comments: data.num_comments,
				score: data.score
			}
			resultData.push(postData);
			postTexts.push(data.selftext);
		}
	});

	return resultData;
}

async function sendPrompt(promptText) {
	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${OPENAI_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'user', content: promptText }
			]
		})
	});

	const data = await res.json();
	console.log(data.choices[0].message.content);
}

async function sendPrompt2(post) {
	const res = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
		  'Authorization': `Bearer ${OPENAI_KEY}`,
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
		  model: "gpt-4",
		  messages: [
			{
			  role: "system",
			  content: `You are a financial summarizer for stock discussions. Given a Reddit post, return a JSON object:
	{
	  "summary": string (short summary of financial content),
	  "sentiment": string ("positive", "neutral", or "negative")
	}
	If no content is found, return "NO CONTENT".`
			},
			{
			  role: "user",
			  content: `Reddit Post: ${post.text}`
			}
		  ]
		})
	  });
	
	  const data = await res.json();
	  return data.choices[0].message.content;
	};

export async function fetchInsights() {
	const token = await getRedditAccessToken();
	const rawPosts = await getRedditPostsFromSubreddit("wallstreetbets", token);
  
	const enrichedPosts = await Promise.all(rawPosts.map(async (post) => {
	  const aiResponse = await sendPromptForSummary(post);
	  try {
		const json = JSON.parse(aiResponse);
		if (!json.summary || !json.sentiment) throw new Error("Invalid format");
  
		return {
		  id: post.id,
		  title: post.title,
		  body: post.text,
		  createdUtc: new Date(post.created * 1000).toISOString(),
		  score: post.score,
		  summary: json.summary,
		  sentiment: json.sentiment
		};
	  } catch (err) {
		console.log(`Skipping post ${post.id}:`, aiResponse);
		return null;
	  }
	}));
  
	return enrichedPosts.filter(Boolean);
  }

export async function storeInsightsToDB(posts) {
	for (const post of posts) {
	  try {
		await db.insert(postsTable)
		  .values(post)
		  .onConflictDoNothing(); // prevent duplicate insert by ID
	  } catch (err) {
		console.error(`Error inserting post ${post.id}:`, err);
	  }
	}
  }
