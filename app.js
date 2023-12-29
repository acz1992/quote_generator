class QuoteApp {
	constructor() {
		this.quoteBtn = document.getElementById("getQuoteBtn");
		this.quoteSection = document.querySelector("section#quoteDisplay");
		this.quoteElements = {
			quote: this.quoteSection.querySelector("blockquote"),
			author: this.quoteSection.querySelector("p.author"),
			source: this.quoteSection.querySelector("p.source"),
		};
		this.quoteBtn.addEventListener(
			"click",
			this.updatePageWithQuote.bind(this)
		);

		document.addEventListener(
			"DOMContentLoaded",
			this.updatePageWithQuote.bind(this)
		);
	}

	async getRandomQuote() {
		const httpResult = await fetch("http://type.fit/api/quotes");
		const jsonData = await httpResult.json();
		const result = jsonData[Math.floor(Math.random() * jsonData.length)];
		const quote = {
			quote: result.text,
			author: result.author,
			source: "TypeFit",
		};
		console.log(quote);
		return quote;
	}
	async updatePageWithQuote() {
		const randomQuoteResult = await this.getRandomQuote();
		const { quote, author = "Unknown", source } = randomQuoteResult();

		this.quoteElements.quote.textContent = quote;
		this.quoteElements.author.textContent = ` - ${author}`;
		this.quoteElements.source.textContent = `Source: ${source}`;
	}
}

new QuoteApp();
