const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Snake } = require('discord-gamecord');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snake')
		.setDescription('Play a game of snake in your Discord channel.'),
	async execute(interaction, client) {
		try {
            const Game = new Snake({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: 'Snake Game',
                  overTitle: 'Game Over',
                  color: '#39C6F1'
                },
                emojis: {
                  board: '⬛',
                  food: '🍎',
                  up: '⬆️', 
                  down: '⬇️',
                  left: '⬅️',
                  right: '➡️',
                },
                snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
                foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
                stopButton: 'Stop',
                timeoutTime: 60000,
                playerOnlyMessage: 'Only {player} can use these buttons.',
              });
              
              Game.startGame();
              Game.on('gameOver', result => {});

          } catch (err) {
            console.error(err);
            const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
          }
	},
};