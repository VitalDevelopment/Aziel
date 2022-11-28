const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Trivia } = require('discord-gamecord');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Play some trivia in your Discord channel.')
    .addStringOption(option =>
      option.setName("mode")
        .setDescription("The mode to play, true/false or multiple choice.")
        .addChoices({ name: "True or Flase", value: 'single' })
        .addChoices({ name: "Multiple Choice", value: 'multiple' })
    )
    .addStringOption(option =>
      option.setName("difficulty")
        .setDescription("The difficulty of the game, easy, medium, or hard.")
        .addChoices({ name: "Hard", value: 'hard' })
        .addChoices({ name: "Medium", value: 'medium' })
        .addChoices({ name: "Easy", value: 'easy' })
    ),
  async execute(interaction, client) {
    try {
      const Game = new Trivia({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: 'Trivia',
          color: '#39C6F1',
          description: 'You have 60 seconds to guess the answer.'
        },
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        trueButtonStyle: 'SUCCESS',
        falseButtonStyle: 'DANGER',
        mode: interaction.options.getString('mode') ?? 'multiple',  // multiple || single
        difficulty: interaction.options.getString('difficulty') ?? 'hard',  // easy || medium || hard
        winMessage: 'You won, the correct answer is {answer}!',
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
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};