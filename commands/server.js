module.exports = {
    name: "server",
    description: "Returns basic information about the server the command was used on.",
    execute(message) {
        message.channel.send(`This server's name: ${message.guild.name}\nThis server's member count: ${message.guild.memberCount}\nThis server's ID: ${message.guild.id}`);
    }
}