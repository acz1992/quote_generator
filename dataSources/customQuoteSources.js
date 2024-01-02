const quotes = [
	{
		quote: "Those who don’t believe in magic will never find it.",
		author: "Roald Dahl",
	},
	{
		quote: "Be yourself and people will like you",
		author: "Diary of a Wimpy Kid by Jeff Kinney",
	},
	{
		quote: "The moment you doubt whether you can fly, you cease forever to be able to do it.",
		author: "Peter Pan by J.M. Barrie",
	},
	{
		quote: "She decided long ago that life was a long journey. She would be strong, and she would be weak, and both would be okay.",
		author: "Tahereh Mafi",
	},
	{
		quote: "Time you enjoy wasting is not wasted time.",
		author: "Phrynette Married by Marthe Troly-Curtin",
	},
];

const customQuoteSource = {
	name: "Internal App Array",
	getQuote: () =>
		new Promise((resolve, reject) => {
			const randomQuoteFromArray =
				quotes[Math.floor(Math.random() * quotes.length)];
			resolve(randomQuoteFromArray);
		}),
};
