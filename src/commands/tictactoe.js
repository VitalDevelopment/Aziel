const { EmbedBuilder } = require('discord.js')
const { TicTacToe } = require('discord-gamecord');

module.exports = {
    name: "tictactoe",
    aliases: ["ttt"],
    category: "Fun",
    description: "Play a game of TicTacToe with an AI or another member.",
    async run(client, message, args) {
        try {
        const user =  message.mentions.users.first() || client.users.cache.get(args[0]);
        const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription("<:xmark:1045967248038309970> You must provide a user to play against.")
        if(!user) return message.reply({ embeds: [errorEmbed] })

        const Game = new TicTacToe({
            message: message,
            isSlashGame: false,
            opponent: user,
            embed: {
              title: 'Tic Tac Toe',
              color: '#39C6F1',
              statusTitle: 'Status',
              overTitle: 'Game Over'
            },
            emojis: {
              xButton: '❌',
              oButton: '🔵',
              blankButton: '➖'
            },
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '{emoji} | It\'s **{player}** turn.',
            winMessage: '{emoji} | **{player}** won the TicTacToe Game.',
            tieMessage: 'The Game tied! No one won the Game!',
            timeoutMessage: 'The Game went unfinished! No one won the Game!',
            playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
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