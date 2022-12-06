//-Packages & Config-//
const { Client, GatewayIntentBits } = require('discord.js');
const config = require("../config.js");
global.config = config;

//-Requiring other files-//
require("./server/app.js");

//-Defining globals-//
global.guildModel = require("./models/guild.js");

//-Discord Clients-//
const client = new Client({
    allowedMentions: {
        parse: ["users", "roles"], repliedUser: false
    },
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences,
    ]
})
client.login(config.bot.token)
global.client = client;
require("./client.js")