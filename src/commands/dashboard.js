const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');


module.exports = {
  name: "dashboard",
  aliases: ["dash"],
  category: "Info",
  description: "Displays this server's dashboard for Aziel.",
  async run(client, message, args) {

    const data = await global.guildModel.findOne({ id: message.guild.id });

      const embed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setTitle("Server Dashboard")
        .setDescription("Here's some info on you server, as well as the link for your dashboard.")
        .addFields({ name: "Members", value: `${message.guild.memberCount}`, inline: true })
        .addFields({ name: "Commands Ran", value: `${data.commandsRan}`, inline: true })
        .setFooter({
          text: `${client.user.username} - Server Management`,
          iconURL: client.user.displayAvatarURL(),
        });
        const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setURL(`https://azielbot.xyz/dashboard/${message.guild.id}`)
          .setLabel("Dashboard")
          .setStyle(ButtonStyle.Link)
      )
      return message.reply({ embeds: [embed], components: [row] });
  },
};