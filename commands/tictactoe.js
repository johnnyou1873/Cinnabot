const config = require("../config.json");

module.exports = {
    name: "tictactoe",
    description: "[WIP] Starts a game of tic tac toe.",
    hidden: true,
    execute(message, args) {

// board initialization
let board = [];

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let blank = " ";
        board[i, j] = blank;
    }
}

// qwe
// asd
// zxc

// establish direct input

// move handler

// gamestate decode

// game logic

// gamestate encode

// board output
var boardstring = "";

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        boardstring = boardstring.concat("[" + board[i, j] + "]");
    }
    boardstring = boardstring.concat("\n");
}

message.channel.send(boardstring);

// reaction reset

    }
}