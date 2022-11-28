const { EmbedBuilder } = require('discord.js')
const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
  name: "rps",
  category: "Fun",
  description: "Play a game of Rock Paper Scissors in your Discord channel!",
  async run(client, message, args) {
    try {
      const user = message.mentions.users.first() || client.users.cache.get(args[0]);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription("<:xmark:1045967248038309970> You must provide a user to play against.")
      if (!user) return message.reply({ embeds: [errorEmbed] })

      const Game = new RockPaperScissors({
        message: message,
        isSlashGame: false,
        opponent: user,
        embed: {
          title: 'Rock Paper Scissors',
          color: '#39C6F1',
          description: 'Press a button below to make a choice.'
        },
        buttons: {
          rock: 'Rock',
          paper: 'Paper',
          scissors: 'Scissors'
        },
        emojis: {
          rock: '🌑',
          paper: '📰',
          scissors: '✂️'
        },
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        pickMessage: 'You choose {emoji}.',
        winMessage: '**{player}** won the Game! Congratulations!',
        tieMessage: 'The Game tied! No one won the Game!',
        timeoutMessage: 'The Game went unfinished! No one won the Game!',
        playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
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