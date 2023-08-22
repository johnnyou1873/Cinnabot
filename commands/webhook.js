const axios = require("axios");

module.exports = {
	name: "webhook",
	description: "Test file.",
	execute(message, args) {
        const link = "https://discord.com/api/webhooks/852748524508676188/a2o40k2_9i1yL5agUZ_nKTf6Z8Rq-NYuxdcFCPoWWTjvOX-4MQBgLMeKaXHu4CCbei1I";
        const username = "horrible taste";
        const content = "i'm the impostor";
        const avatar_url = "https://cdn.discordapp.com/avatars/159985870458322944/b50adff099924dd5e6b72d13f77eb9d7.png?size=128";
        axios.post(link, {
            "username": username,
            "content": content,
            "avatar_url": avatar_url
        })
        .catch(error => {message.channel.send(error)});
    }
}