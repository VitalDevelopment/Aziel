const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: "warn",
  category: "Mod",
  description: "Warns a user in the guild.",
  async run(client, message, args) {

    const permissionsEmbed = new EmbedBuilder()
      .setColor("#39C6F1")
      .setDescription("**<:xmark:1045967248038309970> You need the \"Manage Messages\" permission to use this command.**");
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply({ embeds: [permissionsEmbed] });

    const guild = client.guilds.cache.get(message.guild.id);
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    let reason = args.splice(1).join(" ");
    const errorEmbed = new EmbedBuilder()
      .setColor("#39C6F1")
      .setDescription("<:xmark:1045967248038309970> You must provide a user for me to warn.")
    if (!user) return message.reply({ embeds: [errorEmbed] })
    if (!reason) reason = "No Reason Provied";
    const error2Embed = new EmbedBuilder()
    .setColor("#39C6F1")
    .setDescription("<:xmark:1045967248038309970> You cannot warn yourself or a bot silly.")
    if (user.id === message.author.id || user.bot) return message.reply({ embeds: [error2Embed] })

    try {
        let id = makeId(10, 10000);
        await global.warnModel.create({
            id: id,
            userid: user.id,
            guildid: message.guild.id,
            modid: message.author.id,
            reason: reason,
            timestamp: Date.now()
        })
        const warnings = await global.warnModel.find({ userid: user.id, guildid: message.guild.id});
        const warnEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setTitle(`Warning ${warnings.length}`)
        .setDescription(`You have been warned in **${message.guild.name}**.`)
        .addFields({ name: "Reason", value: reason, inline: true })
        .addFields({ name: "Executor", value: `${message.author}`, inline: true })
        .setFooter({ text: `${client.user.username} - Warn Management | Warning ID: ${id}`, iconURL: client.user.displayAvatarURL() })
         user.send({ embeds: [warnEmbed] })

        const embed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setTitle("<:checkmark:1045963641406640148> Successfully Warned")
          .setDescription(`I have successfully warned **${user.tag}**.`)
          .addFields({ name: "Reason", value: reason, inline: true })
          .addFields({ name: "Executor", value: `${message.author}`, inline: true })
          .setFooter({ text: `${client.user.username} - Warn Management | Warning ID: ${id}`, iconURL: client.user.displayAvatarURL() })
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