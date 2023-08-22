const config = require("../config.json");

module.exports = {
    name: "changelog",
    description: "Returns Cinnabot's changelog.",
    execute(message) {
        message.channel.send({
            files: [{
                attachment: "./changelog.txt",
                description: "Cinnabot's changelog."
            }]
        })
    }
}

// TODO: simonsays, speller game, tictactoe, directable headpats
// hidden ping
// var x = truthy ? 1 : 2;
// https://github.com/google/mathsteps
// discord webhook sender
// split ${cinnabot} from ${client}