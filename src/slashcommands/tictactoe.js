const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tictactoe')
		.setDescription('Play a game of TicTacToe with an AI or another member.')
        .addUserOption(option =>
            option.setName("opponent")
            .setDescription("The member you want to play with.")),
	async execute(interaction, client) {
		try {
           game.handleInteraction(interaction)
          } catch (err) {
            console.error(err);
            const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
          }
	},
};