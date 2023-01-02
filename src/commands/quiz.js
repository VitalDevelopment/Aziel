const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "quiz",
  aliases: ["q"],
  category: "Fun",
  description: "Play a quick quiz in a Discord channel.",
  async run(client, message, args) {
    try {
        const quiz = require('../../quiz.json');
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };
        const embed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setTitle("Channel Quiz")
        .setDescription("You have 30 seconds to get the answer to this question!")
        .addFields({ name: "Question", value: item.question })
        .setFooter({ text: "Aziel - Quiz Command", iconURL: client.user.displayAvatarURL() })

        message.reply({ embeds: [embed], fetchReply: true })
            .then(() => {
                message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                  .then(collected => {
                    message.channel.send(`${collected.first().author} got it right! \nThe correct answers were \`${item.answers.join(", ")}\`.`);
              })
        .catch(collected => {
            message.channel.send('Looks like nobody got the answer this time.');
            });
        });
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await message.reply({ embeds: [errorEmbed] });
    }

  },
};