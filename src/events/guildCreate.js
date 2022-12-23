const { Events, ActivityType, EmbedBuilder } = require('discord.js');
const model = global.guildModel;
const vitallist = require("vitallist.js")

module.exports = {
    name: Events.GuildCreate,
    once: false,
    async execute(guild, client) {
        const checkGuildBL = await global.blacklistModel.findOne({ guildid: guild.id });
        if (checkGuildBL) return guild.leave().catch(() => null);
        const checkUserBL = await global.blacklistModel.findOne({ userid: guild.ownerId });
        if (checkUserBL) return guild.leave().catch(() => null);

        const embed = new EmbedBuilder()
        .setTitle("New Guild")
        .setColor("39C6F1")

        vitallist.postStats(client, global.config.vlAPIKEY)
        client.user.setActivity(`azielbot.xyz | ${client.guilds.cache.size} guilds.`, { type: ActivityType.Watching })
        
        if (await model.findOne({ id: guild.id })) return;

        await model.create({
            id: guild.id,
            name: guild.name,
            icon: guild.iconURL({ dynamic: true }) ?? 'https://discord.com/assets/dd4dbc0016779df1378e7812eabaa04d.png'
        });
    },
};
