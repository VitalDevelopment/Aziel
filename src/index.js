//-Packages & Config-//
const { Client, GatewayIntentBits } = require('discord.js');
const Revolt = require("revolt.js");
const config = require("../config.js");
global.config = config;

//-Requiring other files-//
require("./server/app.js");

//-Defining globals-//
global.guildModel = require("./models/guild.js");
global.warnModel = require("./models/warning.js");
global.alertModel = require("./models/alert.js")
global.blacklistModel = require("./models/blacklist.js");
global.giveawayModel = require("./models/giveaway.js");

//-Discord Client-//
const client = new Client({
    allowedMentions: {
        parse: ["users", "roles"], repliedUser: false
    },
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates 
    ]
})
client.login(config.bot.token)
global.client = client;
require("./client.js")

//-Revolt Client-//
require("./revolt/index.js")