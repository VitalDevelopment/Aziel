const { Events, ActivityType } = require('discord.js');
const model = global.guildModel;
const vitallist = require("vitallist.js")

module.exports = {
    name: Events.GuildDelete,
    once: false,
    async execute(guild, client) {

        const embed = new EmbedBuilder()
        .setTitle("Removed Guild")
        .setColor("39C6F1")
        .setDescription(`${guild.name} has removed me, I'm now in ${client.guilds.cache.size} guilds.`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields({ name: "Guild Owner", value: `<@${guild.ownerId}> \`${guild.ownerTag}\``, inline: true})
        .addFields({ name: "Member Conut", value: `${guild.memberCount} members.`, inline: true})
        .setFooter({ text: `${client.user.username} - Guild Logs`, iconURL: client.user.displayAvatarURL() })
        client.channels.resolve("1055922739136958464").send({ embeds: [embed] });

        vitallist.postStats(client, global.config.vlAPIKEY)
        client.user.setActivity(`azielbot.xyz | ${client.guilds.cache.size} guilds.`, { type: ActivityType.Watching })
        
        if (!await model.findOne({ id: guild.id })) return;

        await model.findOneAndDelete({ id: guild.id });
    },
};
