const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a user from the guild.')
        .addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to kick.')
				.setRequired(true))
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('The reason for kicking them.'))
		.setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
		.setDMPermission(false),
	async execute(interaction, client) {
        await interaction.deferReply().catch(() => null);
        const guild = client.guilds.cache.get(interaction.guild.id);
        const user = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided.';
        const days = interaction.options.getString('messages') ?? null;
        const member = guild.members.cache.get(user.id);
       try {
        if (interaction.channel.permissionsFor(interaction.guild.members.cache.get(client.user.id)).has(PermissionsBitField.Flags.KickMembers)) {
        const errorEmbed = new EmbedBuilder()
       .setColor("#39C6F1")
       .setDescription("**<:xmark:1045967248038309970> My roles are too low to kick this member.**")
        if(!member.kickable) return interaction.editReply({embeds: [errorEmbed], ephemeral: true });
       await member.kick({ days: days, reason: `${reason} -> Excuted by ${interaction.user.tag}.` });
       const embed = new EmbedBuilder()
       .setColor("#39C6F1")
       .setTitle("<:checkmark:1045963641406640148> Successfully Kicked")
       .setDescription(`I have successfully kicked **${user.tag}**.`)
       .addFields({ name: "Reason", value: reason, inline: true })
       .addFields({ name: "Executor", value: `${interaction.user}`, inline: true })
       .setFooter({ text: `${client.user.username} - Kick Command`, iconURL: client.user.displayAvatarURL() })
       return interaction.editReply({ embeds: [embed] });
        } else {
         const errorEmbed = new EmbedBuilder()
         .setColor("#39C6F1")
         .setDescription("<:xmark:1045967248038309970> I don't have the \"**Kick Members**\" permission.\nPlease fix my permissions, then run the command again.");
         interaction.editReply({ embeds: [errorEmbed] });
        }
       } catch(err) {
        console.error(err);
        const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
          await interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
       }
	},
};