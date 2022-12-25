const { Events, ActivityType, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const vitallist = require('vitallist.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.info(`${client.user.tag} is online and ready.`)
		client.user.setActivity(`azielbot.xyz | ${client.guilds.cache.size} guilds.`, { type: ActivityType.Watching })

		//-Checking Giveawy ends-//
		setInterval(async () => {
			let giveaways = await global.giveawayModel.find();
			giveaways.map(async db => {
				if (db.status === "ended") return;
				const guild = await client.guilds.fetch(db.guildid);
				let endDate = Date.now();
				if (db.timestamp - (Date.now() - db.time) <= 0) {
				  const giveEmbed = new EmbedBuilder()
				  .setAuthor({ name: "Giveaway Ended", iconURL: guild.iconURL() })
				  .setColor("#39C6F1")
				  .setDescription(`**No one entered into the giveaway, so I couldn't pick a winner.**\n**Prize**: ${db.prize}\n**Ended**: <t:${Math.floor((endDate) / 1000)}:R>\n**Entries**: ${db.entries.length}\n**Hosted by**: <@${db.hostedBy}>`)
				  .setFooter({ text: `Giveaway ID: ${db.messageid}`, iconURL: client.user.displayAvatarURL() })
		  
				  if (db.entries.length === 0) {
					await db.updateOne({
						status: 'ended',
					  })
					return await client.guilds.cache.get(db.guildid).channels.resolve(db.channelid).messages.fetch({ message: db.messageid }).then(m => m.edit({
					  embeds: [giveEmbed],
					  components: []
				    	}));
			    	}
					for (let i = 0; i < db.winners; i++) {
						let winner = db.entries[Math.floor(Math.random() * db.entries.length)];
			  
						db.pickedWinners.push(winner)
						await db.save()
					  }
					  const successEmbed = new EmbedBuilder()
					  .setAuthor({ name: "Giveaway Ended", iconURL: guild.iconURL() })
					  .setColor("#39C6F1")
					  .setDescription(`**Prize**: ${db.prize}\n**Entries**: ${db.entries.length}\n**Ended**: <t:${Math.floor((endDate) / 1000)}:R>\n**Hosted by**: <@${db.hostedBy}>`)
					  .addFields({ name: "Winners", value: `${db.pickedWinners.map(w => `<@${w}> (\`${w}\`)`).join("\n ")}`})
					  .setFooter({ text: `Giveaway ID: ${db.messageid}`, iconURL: client.user.displayAvatarURL() })

					  client.guilds.cache.get(db.guildid).channels.resolve(db.channelid).send(`${db.pickedWinners.map(w => `<@${w}>`).join(", ")}`).then(m => setTimeout(async () => {
          m.delete()
        }, 2500)).catch(() => {
          return;
        })
		const buttons = new ActionRowBuilder()
		.addComponents(
		  new ButtonBuilder()
			.setLabel('Summary')
			.setURL(`https://azielbot.xyz/giveaways/${db.messageid}`)
			.setStyle(ButtonStyle.Link),
		);

        client.guilds.cache.get(db.guildid).channels.resolve(db.channelid).messages.fetch({ message: db.messageid }).then(m => m.edit({
          embeds: [successEmbed],
          components: [buttons]
        }))

        await db.updateOne({
          status: 'ended',
        })
		     	}
		    })
		}, 5000)
	},
};
