class QuoteApp {
	constructor() {
		this.quoteBtn = document.getElementById("getQuoteBtn");
		this.quoteSection = document.querySelector("section#quoteDisplay");

		console.log(this.quoteSection);

		this.quoteElements = {
			quote: this.quoteSection.querySelector("blockquote"),
			author: this.quoteSection.querySelector("p.author"),
			source: this.quoteSection.querySelector("p.source"),
		};
		console.log(this.quoteElements);

		this.quoteBtn.addEventListener(
			"click",
			this.updatePageWithQuote.bind(this)
		);

		document.addEventListener(
			"DOMContentLoaded",
			this.updatePageWithQuote.bind(this)
		);

		this.dataSources = [
			typeFitDataSource,
			trumpDataSource,
			customQuoteSources,
		];

		this.tweetBtn = document.getElementById("tweetQuoteBtn");
		this.tweetBtn.addEventListener("click", this.tweetQuote.bind(this));
	}

	getRandomDataSource() {
		const dataSource =
			this.dataSources[
				Math.floor(Math.random() * this.dataSources.length)
			];

		// Check for internet connectivity error and return custom data source
		if (
			(dataSource === trumpDataSource ||
				dataSource === typeFitDataSource) &&
			navigator.onLine === false
		) {
			console.error("Internet connection is not available.");
			return customQuoteSources;
		}

		return dataSource;
	}

	async getRandomQuote(source) {
		const dataSource = source || this.getRandomDataSource();
		try {
			const quote = await dataSource.getQuote();

			// Check if the quote is not available or doesn't have necessary properties
			if (!quote || !quote.quote || !quote.author) {
				throw new Error("Invalid quote structure");
			}

			return { ...quote, source: dataSource.name };
		} catch (error) {
			throw new Error("Error fetching quote from data source");
		}
	}

	async updatePageWithQuote() {
		this.quoteSection.classList.add("loading");
		this.quoteBtn.setAttribute("disabled", "disabled");

		let randomQuoteResult;
		try {
			randomQuoteResult = await this.getRandomQuote();
		} catch (error) {
			console.log(error);
			randomQuoteResult = await this.getRandomDataSource(
				customQuoteSources
			);
		}
		const { quote, author = "Unknown", source } = randomQuoteResult;
		this.quoteForSharing = `"${quote}"
-  ${author}
        
Source: ${source}
`;
		setTimeout(() => {
			this.quoteElements.quote.textContent = quote;
			this.quoteElements.author.textContent = ` - ${author}`;
			this.quoteElements.source.textContent = `Source: ${source}`;

			this.setRandomBackgroundColour();
			this.quoteSection.classList.remove("loading");
			this.quoteBtn.removeAttribute("disabled");
		}, 1000);
	}

	tweetQuote() {
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(
				this.quoteForSharing
			)}`
		);
	}

	generateRandomColourNumber() {
		return Math.floor(Math.random() * 255);
	}

	generateRandomColourCode() {
		const r = this.generateRandomColourNumber();
		const g = this.generateRandomColourNumber();
		const b = this.generateRandomColourNumber();

		return {
			r,
			g,
			b,
		};
	}

	setRandomBackgroundColour() {
		const { r, g, b } = this.generateRandomColourCode();
		document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new QuoteApp();
});
