// Invite link: https://discord.com/oauth2/authorize?client_id=832349520830267413&scope=bot&permissions=8

// Read configuration file
const config = require("./config.json");

// Initialize bot
const Discord = require("discord.js");
let client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        // This intent will become enforced on August 31, 2022
        // "MESSAGE_CONTENT"
    ]
});

// Initialize commands
const fs = require("fs");
let commands = new Discord.Collection();

// Initiate help text
helpText = `Command syntax: **${config.prefix}(command) [arguments]**\nNot all commands take arguments, but ones that require them have them noted in **[square brackets]**.\nOptional arguments and their default values are noted in **{curly brackets | default}**.\n\nCommand list:`;

// Load commands
function loadFilesOfDirectory(path) {
    const commandFiles = fs.readdirSync(path).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`${path}/${file}`);
        try {
            commands.set(command.name.toLowerCase(), command);
        } catch {
            console.log(`Error loading "${file}".`);
        }

        // Generate "help" text
        if (!command.hidden) { // that's right, some commands are hidden!
            helpText = helpText.concat(`\n**${command.name}** - ${command.description}`);
        }

        // Checks and loads command aliases
        if (command.alias !== undefined) {
            commands.set(command.alias.toLowerCase(), command);
            helpText = helpText.concat(`\n**${command.alias}** - Alias for ${command.name}.`);
            console.log(`Loaded alias "${command.alias} for "${command.name}"`);
        }
    }
    console.log(`Processed all files in "${path}".`);
}

function loadDirectory(path) {
    loadFilesOfDirectory(`${path}`);
    const commandDirectories = fs.readdirSync(path, {withFileTypes: true}).filter(directory => directory.isDirectory()).map(directory => directory.name);
    for (const directory of commandDirectories) {
        if (commandDirectories) {
            loadDirectory(`${path}/${directory}`);
        }
    }
}

loadDirectory(config.commandDirectory);

// Client OK and set custom status
client.once("ready", async () => {
    console.log("Cinnabot is online!");
    client.user.setActivity(config.status.name, { type: config.status.type })
    console.log(`Activity set to "${client.user.presence.activities[0].name}".`);
    // commands.get("test").execute(message, args, client);
    
    // Manually pin message
    // const achannel = await client.channels.fetch("id");
    // const amessage = await achannel.messages.fetch('id');
    // amessage.pin();
    setInterval(() => {
        var present = new Date(); // for now
        console.log(present.getHours());
        if (present.getHours() == 15 && present.getMinutes() == 0 && present.getDay() == 1) {
            client.channels.cache.get("579810096985538562")
            .send("weekly reminder for <@558471271785037826> to STAY HYDRATED by DRINKING WATER");
        };
    }, 60000);
});

// Handle commands
client.on("messageCreate", async (message) => {
    // Hidden extra features
    if (config.extras) {
        if (message.content.endsWith("(╯°□°）╯︵ ┻━┻")) {
            message.channel.send("┬─┬ ノ( ゜-゜ノ)");
        } else if (message.content.toLowerCase() === "cinnabot") {
            return message.channel.send(`I'm here, ${message.author}.`);
        } else if (message.content === "p!daily") {
            return message.channel.send(`p!rob ${message.author}`);
        }
    }

    // Check if the message is a standard command
    if (!message.content.startsWith(config.prefix) || (message.author.bot && ((message.author.id !== client.user.id) || !config.selfEcho))) {
        return;
    }

    // Parse arguments separated by spaces into an array
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Handle simple response commands
    if (typeof config.responses[command.toLowerCase()] !== "undefined" && config.responses[command.toLowerCase()] !== null) {
        return message.channel.send(config.responses[command.toLowerCase()]);
    }

    // Handle built-in help command
    if (command === "help") {
        return message.channel.send(helpText);
    }

    // Call commands
    if (typeof commands.get(command) !== "undefined" && commands.get(command) !== null) {
        try {
            commands.get(command).execute(message, args, client);
        } catch (error) {
            message.channel.send(`Something went wrong.\n${error}`);
        }
    } else {
        message.channel.send(`I didn't quite catch that, ${message.author}.`);
    }
});

function isItThere(array, target) {
    array.forEach((value, key) => {
        if (item == target) {
            return true;
        }
    });
    return false;
}

// Automated emoji updater
client.on("userUpdate", (oldUser, newUser) => {
    if (oldUser.avatar == newUser.avatar) return;
    config.UEEnable.forEach(async (guildID) => {
        const guild = await client.guilds.fetch(guildID);
        if (!(() => {
            let found = false;
            guild.members.cache.forEach((value, key) => {
                if (key == newUser.id) {
                    found = true;
                }
            });
            return found;
        })()) return;
        const people = config.people;
        let name = newUser.id;
        for (const person in people) {
            if (people[person] == newUser.id) {
                name = "literally" + person;
            }
        }
        const url = newUser.avatarURL({
            format: "png",
            // does not work for smaller avatars?
            // size: 4096
        });
        const channel = await client.channels.fetch("812133860363337789");
        await guild.emojis.fetch();
        guild.emojis.cache.forEach(async (emoji) => {
            if (emoji.name == name) {
                try {
                    await emoji.delete();
                } catch (error) {
                    console.error();
                }
            }
        });
        try {
            const emoji = await guild.emojis.create(url, name);
            channel.send(`Automatic emoji update! ${emoji}`);
        } catch {
            channel.send("Emoji creation error. Are there open emoji slots and do I have emoji permissions?");
            console.error();
        }
    });
});

// Pinpon
async function pinpon(channel, archiveID) {
    if (channel.type != "GUILD_TEXT") return;
    const pinned = await channel.messages.fetchPinned();
    if (pinned.size <= 49) return;
    const firstPinned = Array.from(pinned)[pinned.size-1][1];
    const archive = await client.channels.fetch(archiveID);
    let attachments = [];
    firstPinned.attachments.forEach((attachment) => {
        attachments.push(attachment);
    });
    archive.send({
        embeds: [{
            // color: "#0099ff",
            author: {
                name: firstPinned.author.username,
                icon_url: firstPinned.author.avatarURL({
                    format: "png",
                    size: 4096
                }),
                url: firstPinned.url
            },
            description: firstPinned.content,
            timestamp: firstPinned.createdTimestamp,
        }],
        files: attachments
    });
    
    firstPinned.unpin();
    
    /* const webhook = new Discord.WebhookClient({
        url:
    }, options);
    
    webhook.send({
        username:
        avatarURL:
        content:
        files:

    })
    */

    // const exampleEmbed = {
    //     color: 0x0099ff,
    //     title: 'Some title',
    //     url: 'https://discord.js.org',
    //     author: {
    //         name: 'Some name',
    //         icon_url: 'https://i.imgur.com/AfFp7pu.png',
    //         url: 'https://discord.js.org',
    //     },
    //     description: 'Some description here',
    //     thumbnail: {
    //         url: 'https://i.imgur.com/AfFp7pu.png',
    //     },
    //     fields: [
    //         {
    //             name: 'Regular field title',
    //             value: 'Some value here',
    //         },
    //         {
    //             name: '\u200b',
    //             value: '\u200b',
    //             inline: false,
    //         },
    //         {
    //             name: 'Inline field title',
    //             value: 'Some value here',
    //             inline: true,
    //         },
    //         {
    //             name: 'Inline field title',
    //             value: 'Some value here',
    //             inline: true,
    //         },
    //         {
    //             name: 'Inline field title',
    //             value: 'Some value here',
    //             inline: true,
    //         },
    //     ],
    //     image: {
    //         url: 'https://i.imgur.com/AfFp7pu.png',
    //     },
    //     timestamp: new Date(),
    //     footer: {
    //         text: 'Some footer text here',
    //         icon_url: 'https://i.imgur.com/AfFp7pu.png',
    //     },
    // };
    // archive.send({
    //     content: "This is an embed",
    //     embeds: [exampleEmbed]
    // });
}

client.once("ready", () => {
    config.PPEnable.forEach(async (guildID) => {
        const guild = await (async () => {
            try {
                return await client.guilds.fetch(guildID);
            } catch (error) {
                console.error();
            }
        })();
        const channels = await guild.channels.fetch();
        channels.forEach((channel) => {
            pinpon(channel, config.PPIDs[guildID]);
        });
    });
    // client.users.cache.get("332401282893742080").send("i mean, this is cinnabot beep boop");
});

client.on("channelPinsUpdate", (channel) => {
    pinpon(channel, config.PPIDs[channel.guild.id]);
});

// Bot login
client.login(config.token);