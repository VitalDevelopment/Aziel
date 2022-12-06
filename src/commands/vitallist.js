const { EmbedBuilder } = require('discord.js')
const vitallist = require('vitallist.js');

module.exports = {
  name: "vitallist",
  category: "Utility",
  aliases: ["vl"],
  description: "Find info from a bot on vitallist.",
  async run(client, message, args) {
    try {
        let bot = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!bot) bot = client.user;
    const data = await vitallist.fetchBot(bot.id);
     const embed = new EmbedBuilder()
     .setColor("#39C6F1")
     .setTitle("VitalList API")
     .setThumbnail(`https://cdn.discordapp.com${data.avatar}`)
     .setDescription(`:black_square_button:Username: ${data.username}#${data.discriminator}\n:black_square_button:Prefix: ${data.prefix}\n:black_square_button:Owner: <@${data.owner}> \`${data.ownerTag}\``)
     message.reply({ embeds: [embed] })
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await message.reply({ embeds: [errorEmbed] });
    }
  },
};