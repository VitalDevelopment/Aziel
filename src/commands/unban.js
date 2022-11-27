const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    name: "unban",
    aliases: ["unboot"],
    category: "Mod",
    description: "Unbans a user from the guild.",
    async run(client, message, args) {

        const permissionsEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription("<:xmark:1045967248038309970> You need the \"Ban Members\" permission to use this command.");
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.reply({ embeds: [permissionsEmbed] });
        const errorEmbed = new EmbedBuilder()
       .setColor("#39C6F1")
       .setDescription("<:xmark:1045967248038309970> You must provide a user id for me to unban.")
        if(!args[0]) return message.reply({ embeds: [errorEmbed] });
        const reason = args.splice(1).join(" ");
       const error2Embed = new EmbedBuilder()
       .setColor("#39C6F1")
       .setDescription("<:xmark:1045967248038309970> You must provide a reason for me to unban them.")
       if(!reason) return message.reply({ embeds: [error2Embed] })

       try {
        if (message.channel.permissionsFor(message.guild.members.cache.get(client.user.id)).has(PermissionsBitField.Flags.BanMembers)) {
       await message.guild.members.unban( args[0], `${reason} -> Excuted by ${message.author.tag}.` );
       const embed = new EmbedBuilder()
       .setColor("#39C6F1")
       .setTitle("<:checkmark:1045963641406640148> Successfully Unbanned")
       .setDescription(`I have successfully unbanned **${user.tag}**.`)
       .addFields({ name: "Reason", value: reason, inline: true })
       .addFields({ name: "Executor", value: `${message.author}`, inline: true })
       .setFooter({ text: `${client.user.username} - Unban Command`, iconURL: client.user.displayAvatarURL() })
       return message.reply({ embeds: [embed] });
        } else {
         const errorEmbed = new EmbedBuilder()
         .setColor("#39C6F1")
         .setDescription("<:xmark:1045967248038309970> I don't have the \"**Ban Members**\" permission.\nPlease fix my permissions, then run the command again.");
          message.reply({ embeds: [errorEmbed] });
        }
       } catch(err) {
        console.error(err);
        const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
          await message.reply({ embeds: [errorEmbed] });
       }
    },
  };