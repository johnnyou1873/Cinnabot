module.exports = {
    name: `roll`,
    description: `Rolls a whole number between 1 and a **[number]**, inclusive.`,
    execute(message, args) {
        if (!isNaN(args[0])) {
            const sides = Number(args[0]);
            const roll = Math.ceil(Math.random() * sides);
            message.channel.send(`Rolled a ${roll}!`);
        } else {
            message.channel.send(`I regret to inform you that I can't roll a number between 1 and ${args[0]}.`);
        }
    }
}