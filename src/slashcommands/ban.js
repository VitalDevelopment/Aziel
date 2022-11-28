const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the guild.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to ban.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName("messages")
                .setDescription("How much of their recent messages to delete.")
                .setRequired(true)
                .addChoices({ name: "12 Hours", value: `0.5` })
                .addChoices({ name: "24 Hours", value: `1` })
                .addChoices({ name: "3 Days", value: `3` })
                .addChoices({ name: "5 Days", value: `5` })
                .addChoices({ name: "7 Days", value: `7` })
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for banning them.'))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
        .setDMPermission(false),
    async execute(interaction, client) {
        await interaction.deferReply().catch(() => null);
        const guild = client.guilds.cache.get(interaction.guild.id);
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided.';
        const days = interaction.options.getString('messages') ?? null;
        const member = guild.members.cache.get(user.id);
        try {
            if (interaction.channel.permissionsFor(interaction.guild.members.cache.get(client.user.id)).has(PermissionsBitField.Flags.BanMembers)) {
                const errorEmbed = new EmbedBuilder()
                    .setColor("#39C6F1")
                    .setDescription("**<:xmark:1045967248038309970> My roles are too low to ban this member.**")
                if (!member.bannable) return interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
                await member.ban({ days: days, reason: `${reason} -> Excuted by ${interaction.user.tag}.` });
                const embed = new EmbedBuilder()
                    .setColor("#39C6F1")
                    .setTitle("<:checkmark:1045963641406640148> Successfully banned")
                    .setDescription(`I have successfully banned **${user.tag}**.`)
                    .addFields({ name: "Reason", value: reason, inline: true })
                    .addFields({ name: "Executor", value: `${interaction.user}`, inline: true })
                    .setFooter({ text: `${client.user.username} - Ban Command`, iconURL: client.user.displayAvatarURL() })
                return interaction.editReply({ embeds: [embed] });
            } else {
                const errorEmbed = new EmbedBuilder()
                    .setColor("#39C6F1")
                    .setDescription("<:xmark:1045967248038309970> I don't have the \"**Ban Members**\" permission.\nPlease fix my permissions, then run the command again.");
                interaction.editReply({ embeds: [errorEmbed] });
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