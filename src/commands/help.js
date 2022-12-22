const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  name: "help",
  category: "Info",
  description: "Some helpfull stuff on the bot.",
  async run(client, message, args) {
    const embed = new EmbedBuilder()
      .setTitle(`${client.user.username} Help Menu`)
      .setColor("#39C6F1")
      .addFields({ name: "Commands", value: "Run a!commands" })
      .setFooter({
        text: `${client.user.username} - Help Command`,
        iconURL: client.user.displayAvatarURL(),
      });
      const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setURL(`https://azielbot.xyz`)
          .setLabel("Website")
          .setStyle(ButtonStyle.Link)
      )
      .addComponents(
        new ButtonBuilder()
          .setURL(`https://discord.gg/HrWe2BwVbd`)
          .setLabel("Support")
          .setStyle(ButtonStyle.Link)
      );
    return message.reply({ embeds: [embed], components: [row] }).catch(() => null);
  },
};