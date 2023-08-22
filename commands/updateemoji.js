const config = require("../config.json");

module.exports = {
    name: "updateemoji",
    alias: "ue",
    description: "Adds/updates the profile picture emojis.",
    execute(message, args, client) {

    function sanitizeName(string) {
        string = string.toLowerCase();
        return string[0].toUpperCase() + string.slice(1);
    }
    
    const person = sanitizeName(args[0]);
    const id = config.people[person];

    if (typeof id == "undefined") {
        return message.channel.send("I don't know this user.");
    }

    const name = `literally${person}`;

    async function createEmoji(user) {
        const url = user.avatarURL({
            format: "png",
            // does not work for smaller avatars?
            // size: 4096
        });
        try {
            const emoji = await message.guild.emojis.create(url, name);
            message.channel.send(`Done! ${emoji}`);
        } catch {
            message.channel.send("Emoji creation error. Are there open emoji slots and do I have emoji permissions?");
        }
    }

    // let temp = {};

    async function deleteEmoji() { // this took way too long to figure out
        const emojis = await message.guild.emojis.fetch();
        // message.guild.emojis.cache.forEach(async (emoji) => {
        emojis.forEach(async (emoji) => {
            if (emoji.name === name) {
                // temp.url = emoji.url;
                // temp.name = emoji.name;
                try {
                    await emoji.delete();
                } catch (error) {
                    console.error();
                }
            }
        });
    }
    
    deleteEmoji();
    
    client.users.fetch(id).then(function(user) {
        createEmoji(user);
    });

    }
}