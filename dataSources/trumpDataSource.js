const trumpDataSource = {
	name: "What does Trumo think?",
	getQuote: async () => {
		const httpResult = await fetch(
			"http://api.whatdoestrumpthink.com/api/v1/quotes/random"
		);
		const jsonData = await httpResult.json();

		return {
			quote: quote.text,
			author: "Donald J. Trump",
		};
	},
};
