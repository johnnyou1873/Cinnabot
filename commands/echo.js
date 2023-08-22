module.exports = {
    name: "echo",
    description: "Echoes some **[text]**.",
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`I don't know what to echo, ${message.author}!`);
        } else {
            return message.channel.send(message.content.slice(message.content.indexOf(this.name) + this.name.length + 1));
        }
    }
}