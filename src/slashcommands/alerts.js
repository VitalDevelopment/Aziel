const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const model = require('../models/alert.js');

module.exports = {
	
	data: new SlashCommandBuilder()
		.setName('alerts')
		.setDescription('Alerts for you to beware of bad users.')
		.addSubcommand(subcommand =>
			subcommand
			.setName('new')
			.setDescription('Creates a user alert on a user.')
        .addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to report.')
				.setRequired(true))
        .addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for reporting them.')
				.setRequired(true))
		.addAttachmentOption(option =>
			option
				.setName('attachment')
				.setDescription('The attachment for reporting, for example an image.')
				.setRequired(false)))
				.addSubcommand(subcommand =>
					subcommand
					.setName('list')
					.setDescription('Lists all the alerts for everyone in this guild.'))
					.addSubcommand(subcommand =>
						subcommand
						.setName('view')
						.setDescription('Shows the details of a certain report.')
						.addIntegerOption(option =>
							option
						 .setName('report_id')
						 .setDescription('The ID of the report to view.')
						 .setRequired(true)))
						 .addSubcommand(subcommand =>
							subcommand
							.setName('enable')
							.setDescription('Enbales auto user join alerts, alerts you if a reported user joins your server.')
							.addChannelOption(option =>
								option
							 .setName('channel')
							 .setDescription('The channel to send new user alerts in.')
							 .setRequired(true)))
							 .addSubcommand(subcommand =>
								subcommand
								.setName('ignore')
								.setDescription('Ignores a certain user alert for this server.')
								.addIntegerOption(option =>
									option
								 .setName('report_id')
								 .setDescription('The channel to send new user alerts in.')
								 .setRequired(true))),

	async execute(interaction) {
		
		const client = global.client;
		await interaction.deferReply({ content: "<a:loading:1046294092432277525> Executing Command..." }).catch(() => null);
		
		if (interaction.options.getSubcommand() === 'new') {
		const data = await model.create({
		   id: makeId(10, 10000),
           reporter: interaction.user.id,
		   userid: interaction.options.getUser('target').id,
		   reason: interaction.options.getString('reason'),
		   timestamp: Date.now()
		});
        const proof = interaction.options.getAttachment('attachment');

		if(proof) {
			data.proof = proof.url;
			await data.save();
		}
		
		let embed = new EmbedBuilder()
			.setColor('#39C6F1')
			.setTitle('New Report')
			.addFields({ name: "🕵️ Reported By:", value: `${interaction.user.tag} \`${interaction.user.id}\``, inline: true})
			.addFields({ name: "👤 Reported User:", value: `${interaction.options.getUser('target').tag} \`${interaction.options.getUser('target').id}\``, inline: true})
			.addFields({ name: "⌚ Reported At:", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true})
			.addFields({ name: "📝 Reason:", value: `\`\`\`${interaction.options.getString('reason')}\`\`\``, inline: true})
			.setTimestamp()
			.setFooter({ text: `Report ID: ${data.id}` });
			
		if (interaction.options.getAttachment('attachment')) {
			embed.setImage(interaction.options.getAttachment('attachment').url);
		} 
		client.channels.cache.get("1013479679497338930").send({ embeds: [embed] }).catch(() => null);
		await interaction.editReply({ content: "<:checkmark:1045963641406640148> Your report was sent successfully.", ephemeral: true }).catch(() => null);

    	} else if (interaction.options.getSubcommand() === 'list') {
			const embed = new EmbedBuilder()
			.setTitle("<:alert:1055541142604763166> User Alerts")
			.setColor('#39C6F1')
			.setDescription("<a:loading:1046294092432277525> Loading Reports...\nIf none load then there are no user reports for this server.")
			.setFooter({ text: `${client.user.username} - User Alerts`, iconURL: client.user.displayAvatarURL() })
			interaction.editReply({ embeds: [embed]})
            interaction.guild.members.cache.forEach(async (member) => {
				let report = await model.findOne({ userid: member.user.id });
				if(report) {
					let reported = "Reported User:";
					if (report.ignore.includes(interaction.guild.id)) return;
					if(member.user.bot) reported = "Reported Bot:";
					embed.addFields({ name: `${reported}`, value: `<@${member.user.id}> -> **Report ID**: ${report.id}`});
					embed.setDescription(" ")
					await interaction.editReply({ embeds: [embed]})
				} else {
					//- nothing-//
				}
			})
	} else if (interaction.options.getSubcommand() === 'view') {
        const caseID = interaction.options.getInteger('report_id');
         const data = await model.findOne({ id: caseID })
		 if (!data) return await interaction.editReply({ content: "I couldn't find that report ID in the database." }).catch(() => null);
         const reporter = await client.users.fetch(data.reporter);
		 const reporteduser = await client.users.fetch(data.userid);
		 let embed = new EmbedBuilder()
			.setColor('#39C6F1')
			.setTitle('<:infosymbol:1046294655660199986> Report Info')
			.addFields({ name: "🕵️ Reported By:", value: `${reporter.tag} \`${reporter.id}\``, inline: true})
			.addFields({ name: "👤 Reported User:", value: `${reporteduser.tag} \`${reporteduser.id}\``, inline: true})
			.addFields({ name: "⌚ Reported At:", value: `<t:${Math.floor(data.timestamp / 1000)}:R>`, inline: true})
			.addFields({ name: "📝 Reason:", value: `\`\`\`${data.reason}\`\`\``, inline: true})
			.setTimestamp()
			.setFooter({ text: `Report ID: ${data.id}` });
			
		if (data.proof) {
			embed.setImage(data.proof);
		} 
		await interaction.editReply({ embeds: [embed] }).catch(() => null);
        } else if (interaction.options.getSubcommand() === 'enable') {

        const data = await global.guildModel.findOne({ id: interaction.guild.id })
		if(data) {
			{
				const newGuild = new global.guildModel({
				  id: interaction.guild.id, name: interaction.guild.name, icon: interaction.guild.iconURL({ dynamic: true })
				});
				await newGuild.save().catch((e) => {
				  console.error(e);
				});
		      }
		   }
		   const channel = interaction.options.getChannel('channel');
		   data.userAlerts = channel.id;
		   await data.save().then(
			await interaction.editReply({ content: `<:checkmark:1045963641406640148> I have enabled the auto join alerts and set the channel to ${channel}.`})
		   )
	    } else if (interaction.options.getSubcommand() === 'ignore') {
			const reportID = interaction.options.getInteger('report_id');
			const data = await global.guildModel.findOne({ id: interaction.guild.id });
			const report = await global.alertModel.findOne({ id: reportID })
			if (!report) return await interaction.editReply({ content: "<:xmark:1045967248038309970>  I couldn't find that report in the database."})
		if(data) {
			{
				const newGuild = new global.guildModel({
				  id: interaction.guild.id, name: interaction.guild.name, icon: interaction.guild.iconURL({ dynamic: true })
				});
				await newGuild.save().catch((e) => {
				  console.error(e);
				});
		      }
		   }
		   if (report.ignore.includes(interaction.guild.id)) {
			report.ignore.splice(report.ignore.indexOf(interaction.guild.id), 1);
			await report.save().then(
				await interaction.editReply({ content: `<:checkmark:1045963641406640148> I have un ignored the user alert for <@${report.userid}>.`})
			)
		   } else {
		   report.ignore.push(interaction.guild.id)
		   await report.save().then(
			await interaction.editReply({ content: `<:checkmark:1045963641406640148> I have ignored the user alert for <@${report.userid}>.`})
		   )
		  }
	   }
	},
};

function makeId(length){
    let text = "";
    const possible = "0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}