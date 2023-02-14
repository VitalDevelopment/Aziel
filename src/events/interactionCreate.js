const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {

        const command = client.slashcommands.get(interaction.commandName);

        let checkBlacklist = await global.blacklistModel.findOne({ userid: interaction.user.id });
    if (checkBlacklist) {
      return interaction.reply({ content: "You have been **blacklisted** from using **Aziel**.\nMake an appeal: https://discord.gg/HrWe2BwVbd", ephemeral: true });
    }

    if (global.cooldown.has(interaction.user.id)) return;
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return await interaction.reply({ content: `No command matching ${interaction.commandName} was found.`, ephemeral: true });
        }

        try {
            if(interaction.guild) {
                const guild = await global.guildModel.findOne({ id: interaction.guild.id});
                guild.commandsRan = guild.commandsRan + 1;
            await guild.save();
            }
            await command.execute(interaction, client);
            global.cooldown.add(interaction.user.id);
            setTimeout(() => {
              global.cooldown.delete(interaction.user.id)
            }, 3000)
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor("#39C6F1")
                .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${error.stack}\`\`\``)
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    } else if (interaction.isButton()) {

        if(interaction.customId === "gEnter") {
            await interaction.deferReply({ content: "<a:loading:1046294092432277525> Loading", ephemeral: true }).catch(() => null);
        const giveaway = await global.giveawayModel.findOne({ messageid: interaction.message.id });
        if (!giveaway) return await interaction.editReply({ content: `<:xmark:1045967248038309970> Button response no longer vaild.`, ephemeral: true })
        if (giveaway.entries.includes(interaction.user.id)) {
            giveaway.entries.splice(giveaway.entries.indexOf(interaction.user.id), 1);
             await giveaway.save().then(
            await interaction.editReply({ content: `<a:954852422591869039:1045952892022034473> **You have successfully left the giveaway.**\nPeople who don't like free stuff are kinda dumb to me. :/`, ephemeral: true })
             )
             const embed = new EmbedBuilder()
        .setTitle("New Giveaway!")
        .setColor("#39C6F1")
        .setFooter({ text: `Giveaway ID: ${interaction.message.id}`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`**Prize**: ${giveaway.prize}\n**Ends**: <t:${Math.floor((giveaway.time + giveaway.timestamp) / 1000)}:R>\n**Entries**: ${giveaway.entries.length}\n**Hosted by**: <@${giveaway.hostedBy}>`)
        return await interaction.message.edit({ embeds: [embed] })
        }

        giveaway.entries.push(interaction.user.id)
        await giveaway.save().then(
        await interaction.editReply({ content: `<:checkmark:1045963641406640148> **You have successfully entered the giveaway.**\nMind sharing some of that prize if you win? :)`, ephemeral: true })
        )
        const embed = new EmbedBuilder()
        .setTitle("New Giveaway!")
        .setColor("#39C6F1")
        .setFooter({ text: `Giveaway ID: ${interaction.message.id}`, iconURL: client.user.displayAvatarURL() })
        .setDescription(`**Prize**: ${giveaway.prize}\n**Entries**: ${giveaway.entries.length}\n**Ends**: <t:${Math.floor((giveaway.time + giveaway.timestamp) / 1000)}:R>\n**Hosted by**: <@${giveaway.hostedBy}>`)
       return await interaction.message.edit({ embeds: [embed] })
           }
        }
    },
};

