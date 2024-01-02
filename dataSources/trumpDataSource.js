const trumpDataSource = {
	name: "What does Trump think?",
	getQuote: async () => {
		const httpResult = await fetch(
			"https://api.whatdoestrumpthink.com/api/v1/quotes/random"
		);
		const quote = await httpResult.json();

		return {
			quote: quote.message,
			author: "Donald J. Trump",
		};
	},
};
