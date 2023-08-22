module.exports = {
    name: "name", // Name of the command (note: this does not have to match the name of the file) [REQUIRED]
    alias: "alias", // A "nickname" for the command [OPTIONAL]
    description: "description", // A short explanation of what this command does (this will show up in the "help" command) [REQUIRED]
    author: "author", // Your name goes here! [OPTIONAL]
    execute(message, args, client) { // "args" (short for "arguments") are what come after the command (i.e., a structure of cb-command-args). args[0] is the first argument, args[1] is the second, etc.


// Code goes here


    }
}