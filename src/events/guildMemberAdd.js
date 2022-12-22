const { Events, EmbedBuilder } = require('discord.js');
const model = require("../models/guild.js")

module.exports = {
	name: Events.GuildMemberAdd,
	once: false,
	async execute(member, client) {
		const data = await model.findOne({ id: member.guild.id });

		//-User Alerts-//
	const alert = await global.alertModel.findOne({ userid: member.user.id });
	if (alert) {
		if(data.userAlerts) {
		if (!alert.ignore.includes(member.guild.id)) {
			const reporter = await client.users.fetch(alert.reporter);
          const embed = new EmbedBuilder()
	      .setTitle("<:alert:1055541142604763166> User Alert")
		  .setColor("#39C6F1")
		  .setThumbnail(member.guild.iconURL({ dynamic: true }))
		  .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true}) })
		  .setDescription("There is an alert on the new user who just joined.")
		  .addFields({ name: "🕵️ Reporter:", value: `${reporter}`, inline: true})
		  .addFields({ name: "⌚ Reported", value: `<t:${Math.floor(alert.timestamp / 1000)}:R>`, inline: true})
		  .addFields({ name: "📝 Reason:", value: `\`\`\`${alert.reason}\`\`\``, inline: false})
		  .setFooter({ text: `${client.user.username} - User Alerts | Report ID: ${alert.id}`, iconURL: client.user.displayAvatarURL() })
		  if (alert.proof) {
			embed.setImage(alert.proof);
		} 
		try {
		await client.channels.resolve(data.userAlerts).send({ embeds: [embed] });
		} catch(err) {
			console.error(err)
	   }
	  }
	 }
	}
	if(!data) return;
	if(!data.welcomeChannel) return;
	if(data.welcomeAndLeave === false) return;
	const channel = client.channels.resolve(data.welcomeChannel);
	let message = data.welcomeMessage;

	message = message
	.replace("{user}", `${member.user}`)
	.replace("{user.username}", `${member.user.username}`)
	.replace("{user.tag}", `${member.user.tag}`)
	.replace("{guild.name}", `${member.guild.name}`)
	.replace("{guild.member_count}", `${member.guild.memberCount}`)
	await channel.send(message);

	},
};
