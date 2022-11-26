const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the bots ping. (Delay)'),
	async execute(interaction, client) {
		try {
            const mesg = await interaction.reply({ content: ":ping_pong: Pong!", fetchReply: true });

            const embed = new EmbedBuilder()
            .setTitle(":ping_pong: Ping Pong!")
            .setColor("#39C6F1")
            .setDescription(`\nBot Latency: \`${mesg.createdTimestamp - interaction.createdTimestamp}ms\`\n Websocket Latency: \`${client.ws.ping}ms\``)
            .setFooter({ text: `${client.user.username} - Ping Command`, iconURL: client.user.displayAvatarURL() })

            await interaction.editReply({ content: "", embeds: [embed] });
          } catch (err) {
            console.error(err);
            const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
          }
	},
};