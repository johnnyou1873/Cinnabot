const Discord = require("discord.js");

module.exports = {
    name: "yukipat",
    description: "Sends an image of Yuki Yoshikawa receiving a headpat.",
    execute(message) {
        message.channel.send({
            content: String(message.author),
            files: [{
                attachment: "./yukiHeadpat.png",
                description: "Yuki Yoshikawa receiving a headpat."
            }]
        })
        // message.channel.send(message.author, new Discord.MessageAttachment("./yukiHeadpat.png"));
        // console.log(new Discord.MessageAttachment("./yukiHeadpat.png"));
    }
}