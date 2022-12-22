const { EmbedBuilder } = require('discord.js')

module.exports = {
  name: "commands",
  category: "Info",
  description: "Check out all of the commands on the bot.",
  async run(client, message, args) {
    const infoCommands = client.commands.filter(c => c.category == "Info" && c.name !== "help" && c.name !== "commands").map(c => `\`${c.name}\` - ${c.description} | **Aliases**: \`${c.aliases ?? "None"}\``);
    const modCommands = client.commands.filter(c => c.category == "Mod").map(c => `\`${c.name}\` - ${c.description} | **Aliases**: \`${c.aliases ?? "None"}\``);
    const configCommands = client.commands.filter(c => c.category == "Config").map(c => `\`${c.name}\` - ${c.description} | **Aliases**: \`${c.aliases ?? "None"}\``);
    const utilityCommands = client.commands.filter(c => c.category == "Utility").map(c => `\`${c.name}\` - ${c.description} | **Aliases**: \`${c.aliases ?? "None"}\``);
    const funCommands = client.commands.filter(c => c.category == "Fun").map(c => `\`${c.name}\` - ${c.description} | **Aliases**: \`${c.aliases ?? "None"}\``);

    const embed = new EmbedBuilder()
      .setTitle(`${client.user.username} Coammands Menu`)
      .setColor("#39C6F1")
      .addFields({ name: "**Information Commands**", value: infoCommands.join("\n") })
      .addFields({ name: "**Fun Commands**", value: funCommands.join("\n") })
      .addFields({ name: "**Utility Commands**", value: utilityCommands.join("\n") })
      .addFields({ name: "**Configuration Commands**", value: configCommands.join("\n") })
      .addFields({ name: "**Moderation Commands**", value: modCommands.join("\n") })
      .setFooter({
        text: `${client.user.username} - Commands`,
        iconURL: client.user.displayAvatarURL(),
      });
    return message.reply({ embeds: [embed] });
  },
};