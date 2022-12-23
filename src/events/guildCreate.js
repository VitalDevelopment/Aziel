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

        const owner = await client.users.fetch(guild.ownerId);
        const embed = new EmbedBuilder()
        .setTitle("New Guild")
        .setColor("39C6F1")
        .setDescription(`${guild.name} has added me, I'm now in ${client.guilds.cache.size} guilds.`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields({ name: "Guild Owner", value: `<@${guild.ownerId}> \`${owner.tag}\``, inline: true})
        .addFields({ name: "Member Conut", value: `${guild.memberCount} members.`, inline: true})
        .setFooter({ text: `${client.user.username} - Guild Logs`, iconURL: client.user.displayAvatarURL() })
        client.channels.resolve("1055922739136958464").send({ embeds: [embed] });

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
