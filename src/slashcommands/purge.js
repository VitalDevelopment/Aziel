const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purges a amount of messages in a channel.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('The amount of messages to purge.')
        .setMinValue(2)
        .setMaxValue(99)
        .setRequired(true)),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger('amount');
    try {
      await interaction.deferReply().catch(() => null);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription("<:xmark:1045967248038309970> You need the \"Manage Messages\" permission to use this.");
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
      if (interaction.channel.permissionsFor(interaction.guild.members.cache.get(client.user.id)).has(PermissionsBitField.Flags.ManageMessages)) {
        await interaction.channel.messages.fetch({ limit: amount + 1 }).then(messages => {
          interaction.channel.bulkDelete(messages)
          const embed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`**<:checkmark:1045963641406640148> I have successfully purged ${amount} messages.**`)
          interaction.editReply({ embeds: [embed], ephemeral: true })
        });
      } else {
        const errorEmbed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setDescription("<:xmark:1045967248038309970> I don't have the \"**Manage Messages**\" permission.\nPlease fix my permissions, then run the command again.");
        interaction.editReply({ embeds: [errorEmbed], ephemeral: true })
      }
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};