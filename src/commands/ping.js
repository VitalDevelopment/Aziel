const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "ping",
  aliases: ["latency", "delay"],
  category: "Info",
  description: "Check the bots ping. (Delay)",
  async run(client, message, args) {
    try {
      const mesg = await message.reply({ content: ":ping_pong: Pong!" });

      const embed = new EmbedBuilder()
        .setTitle(":ping_pong: Ping Pong!")
        .setColor("#39C6F1")
        .setDescription(`\nBot Latency: \`${mesg.createdTimestamp - message.createdTimestamp}ms\`\n Websocket Latency: \`${client.ws.ping}ms\``)
        .setFooter({ text: `${client.user.username} - Ping Command`, iconURL: client.user.displayAvatarURL() })

      await mesg.edit({ content: "", embeds: [embed] });
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await message.reply({ embeds: [errorEmbed] });
    }

  },
};