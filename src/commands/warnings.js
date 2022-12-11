const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: "warnings",
  category: "Info",
  description: "Find out all of the warnings for a user.",
  async run(client, message, args) {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) user = message.author;

    try {
        const warnings = await global.warnModel.find({ userid: user.id, guildid: message.guild.id});

        const embed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setTitle("Warnings")
          .setDescription(`${user} has ${warnings.length} warning(s).`)
          .setFooter({ text: `${client.user.username} - Warn Management`, iconURL: client.user.displayAvatarURL() })

          for (let i = 0; i < warnings.length; i++) {
            embed.addFields({ name: `Warning ${i+1}`, value: `${warnings[i].reason} - Warning ID: ${warnings[i].id}`});
          }

        return message.reply({ embeds: [embed] });

    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await message.reply({ embeds: [errorEmbed] });
    }
  },
};

function makeId(length){
    let text = "";
    const possible = "0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}