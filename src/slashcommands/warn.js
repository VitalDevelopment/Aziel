const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns a user in this guild.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to ban.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for warning them.'))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .setDMPermission(false),
    async execute(interaction, client) {
        await interaction.deferReply().catch(() => null);
        const guild = client.guilds.cache.get(interaction.guild.id);
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided.';

        const errorEmbed = new EmbedBuilder()
      .setColor("#39C6F1")
      .setDescription("<:xmark:1045967248038309970> You must provide a user for me to warn.")
    if (!user) return interaction.editReply({ embeds: [errorEmbed] })
    if (!reason) reason = "No Reason Provied";
    const error2Embed = new EmbedBuilder()
    .setColor("#39C6F1")
    .setDescription("<:xmark:1045967248038309970> You cannot warn yourself or a bot silly.")
    if (user.id === interaction.user.id || user.bot) return interaction.editReply({ embeds: [error2Embed] })

    try {
        let id = makeId(10, 10000);
        await global.warnModel.create({
            id: id,
            userid: user.id,
            guildid: interaction.guild.id,
            modid: interaction.user.id,
            reason: reason,
            timestamp: Date.now()
        })
        const warnings = await global.warnModel.find({ userid: user.id, guildid: interaction.guild.id });
        const warnEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setTitle(`Warning ${warnings.length}`)
        .setDescription(`You have been warned in **${interaction.guild.name}**.`)
        .addFields({ name: "Reason", value: reason, inline: true })
        .addFields({ name: "Executor", value: `${interaction.user}`, inline: true })
        .setFooter({ text: `${client.user.username} - Warn Management | Warning ID: ${id}`, iconURL: client.user.displayAvatarURL() })
         user.send({ embeds: [warnEmbed] })

        const embed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setTitle("<:checkmark:1045963641406640148> Successfully Warned")
          .setDescription(`I have successfully warned **${user.tag}**.`)
          .addFields({ name: "Reason", value: reason, inline: true })
          .addFields({ name: "Executor", value: `${interaction.user}`, inline: true })
          .setFooter({ text: `${client.user.username} - Warn Management | Warning ID: ${id}`, iconURL: client.user.displayAvatarURL() })
        return interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};

function makeId(length){
    let text = "";
    const possible = "123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}