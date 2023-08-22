const axios = require("axios");

module.exports = {
	name: "nasa",
	description: "Sends today's NASA Astronomy Picture of the Day.",
	execute(message) { 
        axios.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY") // this is modified code from https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
        .then(response => {
            message.channel.send(`NASA APOD for ${response.data.date}:`);
            message.channel.send(response.data.url);
            message.channel.send(response.data.explanation);
            message.channel.send("`" + JSON.stringify(response.data) +"`");
        })
        .catch(error => {
            message.channel.send(error);
        });
    }
}