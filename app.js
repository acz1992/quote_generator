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

		this.dataSources = [typeFitDataSource, trumpDataSource];
	}

	getRandomDataSource() {
		return this.dataSources[
			Math.floor(Math.random() * this.dataSources.lngth)
		];
	}

	async getRandomQuote() {
		const dataSource = this.dataSources[0];
		const quote = await dataSource.getQuote();

		return { ...quote, source: dataSource.name };
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
