const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "headpat",
    description: "Sends a random GIF of a headpat.",
    execute(message) {
        const directory = "./media/headpats";
        const i = Math.floor(Math.random() * fs.readdirSync(directory).length) + 1;
        // message.channel.send(message.author, new Discord.MessageAttachment(directory + "/headpat (" + i + ").gif"));
        message.channel.send({
            content: String(message.author),
            files: [{
                attachment: String(directory) + "/headpat (" + String(i) + ").gif",
                description: "Headpat!"
            }]
        })
    }
}