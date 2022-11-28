const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: "kick",
  aliases: ["yeet"],
  category: "Mod",
  description: "Kicks a user from the guild.",
  async run(client, message, args) {

    const permissionsEmbed = new EmbedBuilder()
      .setColor("#39C6F1")
      .setDescription("**<:xmark:1045967248038309970> You need the \"Kick Members\" permission to use this command.**");
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.reply({ embeds: [permissionsEmbed] });

    const guild = client.guilds.cache.get(message.guild.id);
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    const reason = args.splice(1).join(" ");
    const errorEmbed = new EmbedBuilder()
      .setColor("#39C6F1")
      .setDescription("**<:xmark:1045967248038309970> You must provide a user for me to kick.**")
    if (!user) return message.reply({ embeds: [errorEmbed] })
    const error2Embed = new EmbedBuilder()
      .setColor("#39C6F1")
      .setDescription("**<:xmark:1045967248038309970> You must provide a reason for me to kick them.**")
    if (!reason) return message.reply({ embeds: [error2Embed] })
    const member = guild.members.cache.get(user.id);

    try {
      if (message.channel.permissionsFor(message.guild.members.cache.get(client.user.id)).has(PermissionsBitField.Flags.KickMembers)) {
        const errorEmbed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setDescription("**<:xmark:1045967248038309970> My roles are too low to kick this member.**")
        if (!member.kickable) return message.reply({ embeds: [errorEmbed] });
        await member.kick({ reason: `${reason} -> Excuted by ${message.author.tag}.` });
        const embed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setTitle("<:checkmark:1045963641406640148> Successfully kicked")
          .setDescription(`I have successfully kicked **${user.tag}**.`)
          .addFields({ name: "Reason", value: reason, inline: true })
          .addFields({ name: "Executor", value: `${message.author}`, inline: true })
          .setFooter({ text: `${client.user.username} - kick Command`, iconURL: client.user.displayAvatarURL() })
        return message.reply({ embeds: [embed] });
      } else {
        const errorEmbed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setDescription("<:xmark:1045967248038309970> I don't have the \"**Kick Members**\" permission.\nPlease fix my permissions, then run the command again.");
        message.reply({ embeds: [errorEmbed] });
      }
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await message.reply({ embeds: [errorEmbed] });
    }
  },
};