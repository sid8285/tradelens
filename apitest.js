import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const REDDIT_SECRET = process.env.REDDIT_SECRET;
const REDDIT_ID = process.env.REDDIT_ID;
const HF_API_KEY = process.env.HF_API_KEY;

const getRedditAccessToken = async () => {
	const credentials = Buffer.from(`${REDDIT_ID}:${REDDIT_SECRET}`).toString('base64');

	const res = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: "POST",
		headers: {
			"Authorization": `Basic ${credentials}`,
			"Content-Type": "application/x-www-form-urlencoded",
			"User-Agent": "TradelensScript/0.1 by " + process.env.REDDIT_USERNAME
		},
		body: new URLSearchParams({
			grant_type: "password",
			username: process.env.REDDIT_USERNAME,
			password: process.env.REDDIT_PASSWORD
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
			"User-Agent": "Tradelens Script",
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

	const resultData = [];

	posts.forEach(post => {
		const data = post.data;
		if (!data.stickied) {
			const postData = {
				id: data.id,
				text: data.selftext || '',
				author: data.author_fullname,
				title: data.title,
				created: data.created,
				num_comments: data.num_comments,
				score: data.score
			};
			resultData.push(postData);
		}
	});

	return resultData;
};

async function sendPrompt2(post) {
	const res = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${HF_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			inputs: `Extract actionable financial insights and stock tickers from this Reddit post:\n\n"${post.text}"\n\nRespond in JSON with two fields: insights (list of actions like buy/sell/hold), and tickers (list of tickers like TSLA, AAPL). If none, return "NO INSIGHTS AVAILABLE".`
		})
	});

	const data = await res.json();

	// Catch rate-limits, errors, etc.
	if (!Array.isArray(data) || !data[0]?.generated_text) {
		console.error("Hugging Face Error:", data);
		return "NO INSIGHTS AVAILABLE";
	}

	try {
		const parsed = JSON.parse(data[0].generated_text);
		return parsed;
	} catch (e) {
		console.error("Not Jsonifiable", data[0].generated_text);
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

	// You can write `output` to a file or database if needed
})();
