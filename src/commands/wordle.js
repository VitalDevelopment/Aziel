const { EmbedBuilder } = require('discord.js')
const { Wordle } = require('discord-gamecord');

module.exports = {
    name: "wordle",
    category: "Fun",
    description: "Play a game of wordle in your Discord channel..",
    async run(client, message, args) {
        try {
            const Game = new Wordle({
                message: message,
                isSlashGame: false,
                embed: {
                  title: 'Wordle',
                  color: '#39C6F1',
                },
                customWord: null,
                timeoutTime: 60000,
                winMessage: 'You won, the word was **{word}**.',
                loseMessage: 'You lost, the word was **{word}**.',
                playerOnlyMessage: 'Only {player} can use these buttons.'
              });
              
              Game.startGame();
        } catch (err) {
            console.error(err);
            const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
            await message.reply({ embeds: [errorEmbed] });
      }
    },
  };