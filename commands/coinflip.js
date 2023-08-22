module.exports = {
    name: "coinflip",
    description: "Flips a virtual coin.",
    execute(message) {
        const coin = Math.floor(Math.random() * 2);
        // switch (coin) {
        //     case 0:
        //         message.channel.send("Heads!");
        //         break;
        //     case 1:
        //         message.channel.send("Tails!");
        //         break;
        //     default:
        //         message.channel.send("It... landed on its edge.");
        // }
        const cases = ["Heads!", "Tails", "It... landed on its edge."];
        message.channel.send(cases[coin]);
    }
}