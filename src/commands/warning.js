const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  name: "warning",
  category: "Info",
  description: "Info on a user's warning.",
  async run(client, message, args) {

    const permissionsEmbed = new EmbedBuilder()
      .setColor("#39C6F1")
      .setDescription("**<:xmark:1045967248038309970> You need the \"Manage Messages\" permission to use this command.**");
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply({ embeds: [permissionsEmbed] });

    const guild = client.guilds.cache.get(message.guild.id);

    if(args[0] === "delete") {
        try {
            const permissionsEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription("**<:xmark:1045967248038309970> You need the \"Manage Messages\" permission to use this command.**");
          if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply({ embeds: [permissionsEmbed] });
            let id = args[1];
            const errorEmbed = new EmbedBuilder()
              .setColor("#39C6F1")
              .setDescription("<:xmark:1045967248038309970> You must provide a warning ID.")
            if (!id) return message.reply({ embeds: [errorEmbed] })
            let warning = await global.warnModel.findOne({
                id: id,
                guildid: message.guild.id,
            })
            if(!warning) {
                const errorEmbed = new EmbedBuilder()
               .setColor("#39C6F1")
               .setDescription("<:xmark:1045967248038309970> I couldn't find that warning for this guild.")
               return message.reply({ embeds: [errorEmbed] })
             }
            const error1Embed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription("<:xmark:1045967248038309970> You cannot remove your own warning.")
            if(warning.userid === message.author.id) return message.reply({ embeds: [error1Embed] })

            const embed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setTitle("<:checkmark:1045963641406640148> Successfully Deleted")
            .setDescription(`I have successfully deleted the warning for <@${warning.userid}>`)
            .setFooter({ text: `${client.user.username} - Warn Management | Warning ID: ${id}`, iconURL: client.user.displayAvatarURL() })
            await warning.delete().then((w) => {
                return message.reply({ embeds: [embed] });
            })

        } catch(err) {
            console.error(err);
            const errorEmbed = new EmbedBuilder()
              .setColor("#39C6F1")
              .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
            await message.reply({ embeds: [errorEmbed] });
        }
    } else {
        let id = args[0];
        const errorEmbed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setDescription("<:xmark:1045967248038309970> You must provide a warning ID.")
        if (!id) return message.reply({ embeds: [errorEmbed] })
    
        try {
            let warning = await global.warnModel.findOne({
                id: id,
                guildid: message.guild.id,
            })

            if(!warning) {
           const errorEmbed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setDescription("<:xmark:1045967248038309970> I couldn't find that warning for this guild.")
          return message.reply({ embeds: [errorEmbed] })
        }

            const embed = new EmbedBuilder()
              .setColor("#39C6F1")
              .setTitle("Warning Informaion")
              .setDescription(`**User**: <@${warning.userid}>\n**Reason**: ${warning.reason}\n**Executor**: <@${warning.modid}>\n**Date**: <t:${Math.floor(warning.timestamp / 1000)}:R>`)
              .setFooter({ text: `${client.user.username} - Warn Management | Warning ID: ${id}`, iconURL: client.user.displayAvatarURL() })
            return message.reply({ embeds: [embed] });

        } catch (err) {
          console.error(err);
          const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
          await message.reply({ embeds: [errorEmbed] });
        }
    }
  },
};