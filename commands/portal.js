module.exports = {
    name: "portal",
    description: "Sends **[channel ID]** some **[text]**.",
    execute(message, args, client) {
        if (!args.length) {
            return message.channel.send(`I don't know what channel ID to send to, ${message.author}!`);
        } else if (client.channels.cache.get(args[0])) { // ah, the wonders of type coersion
            if (client.channels.cache.get(args[0]).isText()) {
                if (args[1]) {
                    return client.channels.cache.get(args[0])
                    .send(`**${message.author.username} from ${message.channel.id}**  ${message.content.slice(message.content.indexOf(args[0]) + args[0].length + 1)}`)
                    .then(message.channel.send(`Message sent to ${client.channels.cache.get(args[0])}.`))
                    .catch(error => message.channel.send(`Actually, scratch that. Something went wrong. \`${error}\`\nThis message is a workaround until Cinnamon can implement a proper error handler.`));
                } else {
                    return message.channel.send(`I don't know what message to send, ${message.author}!`);
                }
            } else {
                return message.channel.send(`I could not send the message to the specified channel ID, ${message.author}. It is a ${client.channels.cache.get(args[0]).type} channel.`)
            }
        } else {
            message.channel.send(`I could not access the specified channel ID, ${message.author}.`);
        }
    }
}