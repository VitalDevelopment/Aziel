const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { getCode, clean } = require("@elara-services/eval-helper");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Evaluates Javascript code in a command.')
        .addStringOption((option =>
            option.setName('code')
                .setDescription('The code to evaluate.')
                .setRequired(true))),
    async execute(interaction, client) {
        const input = interaction.options.getString('code');
        if (!global.config.ownerids.includes(interaction.user.id)) return interaction.reply({ content: "Only the developer can run this command.", ephemeral: true });
        try {
            const evaled = await getCode({ code: input });
            const code = await clean(eval(evaled), [client.token]);
            const embed = new EmbedBuilder()
                .setColor("#39C6F1")
                .setTitle("<:checkmark:1045963641406640148> Successfully evaluated.")
                .addFields({ name: "Input", value: `\`\`\`${input}\`\`\`` })
                .addFields({ name: "Output", value: `\`\`\`js\n${code}\`\`\`` })
            return interaction.reply({ embeds: [embed] });
        } catch (e) {
            const errorEmbed = new EmbedBuilder()
                .setColor("#39C6F1")
                .setDescription(`<:xmark:1045967248038309970> There was an error during evaluation.\n\`\`\`js\n${e}\`\`\``)
            return interaction.reply({ embeds: [errorEmbed] })
        }
    },
};