const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	once: false,
   async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.slashcommands.get(interaction.commandName);
    
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return await interaction.reply({ content: `No command matching ${interaction.commandName} was found.`, ephemeral: true });
        }
    
        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${error}\`\`\``)
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
	},
};

