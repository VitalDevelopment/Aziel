const { Events, ActivityType } = require('discord.js');
const model = global.guildModel;
const vitallist = require("vitallist.js")

module.exports = {
    name: Events.GuildDelete,
    once: false,
    async execute(guild, client) {

        vitallist.postStats(client, global.config.vlAPIKEY)
        client.user.setActivity(`azielbot.xyz | ${client.guilds.cache.size} guilds.`, { type: ActivityType.Watching })
        
        if (!await model.findOne({ id: guild.id })) return;

        await model.findOneAndDelete({ id: guild.id });
    },
};
