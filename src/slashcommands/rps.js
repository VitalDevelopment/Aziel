const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Play a game of rock paper scissors in your Discord channel.')
    .addUserOption(option =>
      option.setName("opponent")
        .setDescription("The member you want to play against.")
        .setRequired(true)),
  async execute(interaction, client) {
    let user = interaction.options.getUser('opponent')

    if(user === interaction.user) return interaction.reply("You played yourself, wait you can't.");
      if(user.bot) return interaction.reply("You cannot play a bot, you would get destroyed.");

    try {
      const Game = new RockPaperScissors({
        message: interaction,
        isSlashGame: true,
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
        winMessage: '**{player}** won the game, GGS!',
        tieMessage: 'The game tied, no one won the Game!',
        timeoutMessage: 'The Game went unfinished, so No one won the Game!',
        playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.'
      });

      Game.startGame();
      Game.on('gameOver', result => { });
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};