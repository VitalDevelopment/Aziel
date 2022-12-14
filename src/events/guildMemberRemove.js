const { Events } = require('discord.js');
const model = require("../models/guild.js")

module.exports = {
	name: Events.GuildMemberRemove,
	once: false,
	async execute(member, client) {
		try {
			const data = await model.findOne({ id: member.guild.id });
			if (!data) return;
			if (!data.leaveChannel) return;
			if(data.welcomeAndLeave === false) return;
			const channel = client.channels.resolve(data.leaveChannel);
			let message = data.leaveMessage;
	
			message = message
				.replace("{user}", `${member.user}`)
				.replace("{user.username}", `${member.user.username}`)
				.replace("{user.tag}", `${member.user.tag}`)
				.replace("{guild.name}", `${member.guild.name}`)
				.replace("{guild.member_count}", `${member.guild.memberCount}`)
	
			return await channel.send(message);
		} catch(err) {
			console.log(err)
		}
	},
};
