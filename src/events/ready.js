const { Events, ActivityType } = require('discord.js');
const vitallist = require('vitallist.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.info(`${client.user.tag} is online and ready.`)
		client.user.setActivity("Bryden code me.", { type: ActivityType.Watching })
	},
};
