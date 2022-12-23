const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warning')
        .setDescription('Views details on a certain warning case.')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('delete')
                        .setDescription('Delete a certain warning case on this guild.')
                        .addIntegerOption(option => 
                            option
                            .setName('id')
                            .setDescription('The ID of the certain warning case.')
                            .setRequired(true)))
                            .addSubcommand(subcommand =>
                                subcommand
                                    .setName('view')
                                    .setDescription('Views details on a certain warning case.')
                                    .addIntegerOption(option => 
                                        option
                                        .setName('id')
                                        .setDescription('The ID of the certain warning case.')
                                        .setRequired(true)
                                    ))
        .setDMPermission(false),
    async execute(interaction, client) {

        await interaction.deferReply().catch(() => null);
        const id = interaction.options.getInteger('id');

        if (interaction.options.getSubcommand() === 'view') {
        try {
            let warning = await global.warnModel.findOne({
                id: id,
                guildid: interaction.guild.id,
            })

            if(!warning) {
           const errorEmbed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setDescription("<:xmark:1045967248038309970> I couldn't find that warning for this guild.")
          return interaction.editReply({ embeds: [errorEmbed] })
        }

            const embed = new EmbedBuilder()
              .setColor("#39C6F1")
              .setTitle("Warning Informaion")
              .setDescription(`**User**: <@${warning.userid}>\n**Reason**: ${warning.reason}\n**Executor**: <@${warning.modid}>\n**Date**: <t:${Math.floor(warning.timestamp / 1000)}:R>`)
              .setFooter({ text: `${client.user.username} - Warn Management | Warning ID: ${id}`, iconURL: client.user.displayAvatarURL() })
            return interaction.editReply({ embeds: [embed] });

        } catch (err) {
          console.error(err);
          const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
          await interaction.editReply({ embeds: [errorEmbed] });
        }
       } else if (interaction.options.getSubcommand() === 'delete') {

        try {
            const permissionsEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription("**<:xmark:1045967248038309970> You need the \"Manage Messages\" permission to use this command.**");
          if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.editReply({ embeds: [permissionsEmbed] });
            const errorEmbed = new EmbedBuilder()
              .setColor("#39C6F1")
              .setDescription("<:xmark:1045967248038309970> You must provide a warning ID.")
            if (!id) return interaction.editReply({ embeds: [errorEmbed] })
            let warning = await global.warnModel.findOne({
                id: id,
                guildid: interaction.guild.id,
            })
            if(!warning) {
                const errorEmbed = new EmbedBuilder()
               .setColor("#39C6F1")
               .setDescription("<:xmark:1045967248038309970> I couldn't find that warning for this guild.")
               return interaction.editReply({ embeds: [errorEmbed] })
             }
            const error1Embed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription("<:xmark:1045967248038309970> You cannot remove your own warning.")
            if(warning.userid === interaction.user.id) return interaction.editReply({ embeds: [error1Embed] })

            const embed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setTitle("<:checkmark:1045963641406640148> Successfully Deleted")
            .setDescription(`I have successfully deleted the warning for <@${warning.userid}>`)
            .setFooter({ text: `${client.user.username} - Warn Management | Warning ID: ${id}`, iconURL: client.user.displayAvatarURL() })
            await warning.delete().then((w) => {
                return interaction.editReply({ embeds: [embed] });
            })

        } catch(err) {
            console.error(err);
            const errorEmbed = new EmbedBuilder()
              .setColor("#39C6F1")
              .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
            await interaction.editReply({ embeds: [errorEmbed] });
        }
       }
    },
};