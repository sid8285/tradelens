import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({ path: './keys.env' });

const REDDIT_SECRET = process.env.REDDIT_SECRET;
const REDDIT_ID = process.env.REDDIT_ID;
const REDDIT_USERNAME = process.env.REDDIT_USERNAME;
const REDDIT_PASSWORD = process.env.REDDIT_PASSWORD;
const HF_API_KEY = process.env.HF_API_KEY;

const getRedditAccessToken = async () => {
	const credentials = Buffer.from(`${REDDIT_ID}:${REDDIT_SECRET}`).toString('base64');

	const res = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: "POST",
		headers: {
			"Authorization": `Basic ${credentials}`,
			"Content-Type": "application/x-www-form-urlencoded",
			"User-Agent": `TradelensScript/0.1 by ${REDDIT_USERNAME}`
		},
		body: new URLSearchParams({
			grant_type: "password",
			username: REDDIT_USERNAME,
			password: REDDIT_PASSWORD
		})
	});

	const data = await res.json();

	if (data.error) {
		console.error("Reddit auth error:", data);
		throw new Error("Reddit OAuth failed");
	}

	return data.access_token;
};

const getRedditPostsFromSubreddit = async (subredditName, accessToken) => {
	const url = `https://oauth.reddit.com/r/${subredditName}.json`
	const result = await fetch(url, {
		headers: {
			"Authorization": `bearer ${accessToken}`,
			"User-Agent": `TradelensScript/0.1 by ${REDDIT_USERNAME}`
		}
	});

	if (!result.ok) {
		console.log("Problem with Reddit Request");
		console.log(await result.text());
		return [];
	}

	const body = await result.json();
	const posts = body.data.children;

	console.log(`${posts.length} Posts Returned`);

	return posts
		.filter(post => !post.data.stickied)
		.map(post => ({
			id: post.data.id,
			text: post.data.selftext || '',
			author: post.data.author_fullname,
			title: post.data.title,
			created: post.data.created,
			num_comments: post.data.num_comments,
			score: post.data.score
		}));
};

async function sendPrompt2(post) {
	const prompt = `
You are a financial insight extractor for a data aggregation platform.
Given a Reddit post, extract meaningful, actionable financial advice if present.

Format the response strictly as a JSON object:
{
  "insights": [/* list of actions like buy/sell/hold */],
  "tickers": [/* stock symbols like TSLA, AAPL */]
}

If there is no actionable advice, respond with:
"NO INSIGHTS AVAILABLE"

Reddit Post: "${post.text}"
	`;

	const res = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${HF_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ inputs: prompt })
	});

	const data = await res.json();
	const output = data[0]?.generated_text?.trim();

	if (!output) {
		console.error("Empty or malformed HF response:", data);
		return "NO INSIGHTS AVAILABLE";
	}

	if (output.includes("NO INSIGHTS AVAILABLE")) {
		return "NO INSIGHTS AVAILABLE";
	}

	const jsonMatch = output.match(/\{[\s\S]*?\}/);
	if (!jsonMatch) {
		console.error("Still Not JSON:", output);
		return "NO INSIGHTS AVAILABLE";
	}

	try {
		const parsed = JSON.parse(jsonMatch[0]);
		return {
			insights: parsed.insights || [],
			tickers: parsed.tickers || []
		};
	} catch (e) {
		console.error("JSON parse error:", jsonMatch[0]);
		return "NO INSIGHTS AVAILABLE";
	}
}



(async () => {
	const token = await getRedditAccessToken();
	const posts = await getRedditPostsFromSubreddit("wallstreetbets", token);

	const output = [];

	for (const post of posts) {
		const result = await sendPrompt2(post);
		if (result === "NO INSIGHTS AVAILABLE") {
			console.log("No insights from post:", post.id);
			continue;
		}
		const enriched = { ...post, insights: result.insights, tickers: result.tickers };
		console.log(enriched);
		output.push(enriched);
	}
})();
