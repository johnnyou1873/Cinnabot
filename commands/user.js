module.exports = {
    name: "user",
    description: "Returns basic information about the user.",
    execute(message) {
        message.channel.send(`Your username: ${message.author.username}\nYour discriminator: ${message.author.discriminator}\nYour ID: ${message.author.id}`);
    }
}