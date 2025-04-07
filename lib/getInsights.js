import "dotenv/config"
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
			"model": "gpt-4",
			"messages": [
				{
					"role": "system",
					"content": "You are a financial insight extractor for a data aggregation platform. Given a Reddit post, extract meaningful, actionable financial advice if present. Format the response as a JSON object with two fields:\n\n1. 'insights': a list of specific, tradeable strategies (e.g., buy/sell/monitor specific stocks, strategies based on earnings, trends, etc.).\n2. 'tickers': a list of all stock tickers mentioned in the post (in the format TSLA, NVDA, etc.).\n\nIf there is no actionable advice in the post or if the post is missing, respond with a single string:\n\n\"NO INSIGHTS AVAILABLE\"\n\nDo not include any disclaimers or investment warnings."
				},
				{
					"role": "user",
					"content": `Reddit Post: ${post.text}`
				}
			]
		})
	});

	const data = await res.json();
	//console.log(data);
	return data.choices[0].message.content

}

export async function fetchInsights() {
	const token = await getRedditAccessToken();

	const posts = await getRedditPostsFromSubreddit("wallstreetbets", token);

	const out = await Promise.all(posts.map(async (post) => {
		const result = await sendPrompt2(post);

		try {
			const json = JSON.parse(result);

			if (typeof json !== "object") {
				throw new Error("No Insights Available");
			}
			return { ...post, insights: json.insights, tickers: json.tickers }
		} catch (e) {
			console.log("Not Jsonifiable", result);
			return { ...post, insights: [], tickers: [] };
		}
	}));
	return out.filter(post => post.insights.length > 0);
}
