// Structure of dataSources needs 2 things:
// 1) The Name
// 2) the getQuote function

const typeFitDataSource = {
	name: "Type Fit",
	getQuote: async () => {
		// Returns quote object
		const httpResult = await fetch("https://type.fit/api/quotes");
		const jsonData = await httpResult.json();
		const quote = jsonData[Math.floor(Math.random() * jsonData.length)];

		// Update Author so it removes "",type.fit" reference
		const author = quote.author.split(",")[0].trim();
		quote.author = author;

		return {
			quote: quote.text,
			author: quote.author,
		};
	},
};
