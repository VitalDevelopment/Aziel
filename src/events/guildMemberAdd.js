const { Events } = require('discord.js');
const model = require("../models/guild.js")

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	async execute(member, client) {
    const data = await model.findOne({ id: member.guild.id });
	if(!data) return;
	if(!data.welcomeChannel) return;
	const channel = client.channels.resolve(data.welcomeChannel);
	let message = data.welcomeMessage;

	message = message
	.replace("{user}", `${member.user}`)
	.replace("{user.username}", `${member.user.username}`)
	.replace("{user.tag}", `${member.user.tag}`)
	.replace("{guild.name}", `${member.guild.name}`)
	.replace("{guild.member_count}", `${member.guild.memberCount}`)
	return await channel.send(message);
	},
};
