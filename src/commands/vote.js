const { EmbedBuilder } = require('discord.js')
const vitallist = require('vitallist.js');

module.exports = {
  name: "vote",
  category: "Info",
  aliases: ["voted"],
  description: "Find out how to vote for us.",
  async run(client, message, args) {
    try {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) user = message.author;
    const vl = await vitallist.checkVote(client.user.id, user.id);
    if (vl.voted === false) {
        vl.voted = `No, [Vote Here](https://vitallist.xyz/bots/${client.user.id}/vote)`
    } if (vl.voted === true) {
        vl.voted = `Yes`
    }
    let has = "Has";
    if (user === message.author) has = "Have";
    if (user === message.author) user.username = "you";

     const embed = new EmbedBuilder()
     .setColor("#39C6F1")
     .setTitle(`${has} ${user.username} voted yet?`)
     .setDescription(`These are all of the botlists you can vote for ${client.user.username} on.`)
     .setThumbnail(client.user.displayAvatarURL())
     .addFields({ name: `VitalList`, value: `Voted: **${vl.voted}**` })
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