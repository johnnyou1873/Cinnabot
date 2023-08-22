const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Sends the user's avatar in an embed.",
    execute(message) {
        // const embed = new Discord.MessageEmbed()
        //     .setTitle("Avatar")
        //     .setColor("#0099ff")
        //     .setImage(message.author.avatarURL())
        //     .setTimestamp();
        message.channel.send({
            embeds: [{
                title: String(message.author.username) + "'s avatar",
                color: "#0099ff",
                image: {
                    url: message.author.avatarURL({
                        format: "png",
                        // does not work for smaller avatars?
                        // size: 4096
                    }),
                }
            }]
        });
    }
}