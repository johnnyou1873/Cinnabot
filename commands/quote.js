const quotes = require("../media/quotes/english.json");

module.exports = {
    name: "quote",
    description: "Sends a random quote.",
    execute(message) {
        const i = Math.floor(Math.random() * quotes.quotes.length);
        message.channel.send(`> ${quotes.quotes[i].text}\n${quotes.quotes[i].source}`);
    }
}