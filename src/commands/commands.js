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
      .setAuthor({ name: "Commands Menu", iconURL: client.user.displayAvatarURL() })
      .setColor("#39C6F1")
      .addFields({ name: "**Information**", value: infoCommands.join("\n") })
      .addFields({ name: "**Fun**", value: funCommands.join("\n") })
      .addFields({ name: "**Utility **", value: utilityCommands.join("\n") })
      .addFields({ name: "**Configuration**", value: configCommands.join("\n") })
      .addFields({ name: "**Moderation**", value: modCommands.join("\n") })
    return message.reply({ embeds: [embed] });
  },
};