const { EmbedBuilder } = require('discord.js')
const { Trivia  } = require('discord-gamecord');

module.exports = {
    name: "trivia",
    category: "Fun",
    description: "Play a game of wordle in your Discord channel..",
    async run(client, message, args) {
        try {
            const Game = new Trivia({
                message: message,
                isSlashGame: false,
                embed: {
                  title: 'Trivia',
                  color: '#39C6F1',
                  description: 'You have 60 seconds to guess the answer.'
                },
                timeoutTime: 60000,
                buttonStyle: 'PRIMARY',
                trueButtonStyle: 'SUCCESS',
                falseButtonStyle: 'DANGER',
                mode: 'single',  // multiple || single
                difficulty: 'medium',  // easy || medium || hard
                winMessage: 'You won, The correct answer is {answer}!',
                loseMessage: 'You lost, The correct answer is {answer}.',
                errMessage: 'Unable to fetch question data, please try again.',
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