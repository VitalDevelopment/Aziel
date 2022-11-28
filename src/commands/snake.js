const { EmbedBuilder } = require('discord.js')
const { Snake } = require('discord-gamecord');

module.exports = {
  name: "snake",
  aliases: ["snakegame"],
  category: "Fun",
  description: "Play a game of snake in your Discord channel!",
  async run(client, message, args) {
    try {
      const Game = new Snake({
        message: message,
        isSlashGame: false,
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
        stopButton: 'Stop',
        timeoutTime: 60000,
        snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
        foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
        playerOnlyMessage: 'Only {player} can use these buttons.'
      });

      Game.startGame();
      Game.on('gameOver', result => { });
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await message.reply({ embeds: [errorEmbed] });
    }

  },
};