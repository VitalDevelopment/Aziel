const { Events } = require('discord.js');
const model = global.guildModel;

module.exports = {
    name: Events.GuildCreate,
    once: false,
    async execute(guild, client) {
        if (await model.findOne({ id: guild.id })) return;

        await model.create({
            id: guild.id,
            name: guild.name,
            icon: guild.iconURL({ dynamic: true }) ?? 'https://discord.com/assets/dd4dbc0016779df1378e7812eabaa04d.png'
        });
    },
};
