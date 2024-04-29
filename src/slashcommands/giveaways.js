const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const dhms = require("dhms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveaways')
    .setDescription('Really cool giveaway system for Aziel.')
    .addSubcommand(subcommand => 
        subcommand
        .setName("create")
        .setDescription("Start a new giveaway for your shit anime server.")
            .addStringOption(option => 
                option
                .setName("prize")
                .setDescription("The prize for the desired giveaway.")
                .setRequired(true))
                .addStringOption(option => 
                    option
                    .setName("time")
                    .setDescription("The amount of time to run the giveaway for.")
                    .setRequired(true))
                .addIntegerOption(option => 
                    option
                    .setName("winners")
                    .setDescription("The amount of winners "))
                    .addChannelOption(option => 
                        option
                        .setName("channel")
                        .setDescription("The channel to create the new giveaway in.")
                        .setRequired(false)))
                    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
                    .setDMPermission(false),
  async execute(interaction, client) {
    try {
     await interaction.deferReply().catch(() => null);

       const channel = interaction.options.getChannel("channel") ?? interaction.channel;
       const prize = interaction.options.getString("prize");
       const time = interaction.options.getString("time")
       const winners = interaction.options.getInteger("winners") ?? 1;

       if (time) {
        if (Array.from({
            length: 59000
        }, (_, i) => i + 1).includes(dhms(time))) {
            return interaction.editReply({ ephemeral: true, content: `<:xmark:1045967248038309970> Make sure to only provide \`days\`, \`hours\`, and \`minutes\` first before \`seconds\`.` })
        }
        if (!isNaN(time)) {
            return interaction.editReply({ ephemeral: true, content: `<:xmark:1045967248038309970>} You need to provide \`d\`, \`h\`, \`m\` after the number.` })
        }
        if (time.includes("-")) {
            return interaction.editReply({ ephemeral: true, content: `<:xmark:1045967248038309970> You can only provide positive numbers.` })
        }
        if (Array.from({
            length: 299000
        }, (_, i) => i + 1).includes(dhms(time))) {
            return interaction.editReply({ ephemeral: true, content: `<:xmark:1045967248038309970> You can only make giveaways 5 minutes or longer.` })
        }
    }
    const msg = await channel.send("Loading Giveaway..");
          const giveawayEmbed = new EmbedBuilder()
          .setTitle("New Giveaway!")
          .setColor("#39C6F1")
          .setDescription(`**Prize**: ${prize}\n**Entries**: 0\n**Ends**: <t:${Math.floor((dhms(time) + Date.now()) / 1000)}:R>\n**Hosted by**: ${interaction.user}`)
          .setFooter({ text: `Giveaway ID: ${msg.id}`, iconURL: client.user.displayAvatarURL() })
          const buttons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
                .setCustomId('gEnter')
                .setLabel('🎉 Enter')
                .setStyle('Success'),
                new ButtonBuilder()
                .setLabel('Entries')
                .setURL(`https://aziel.vitaldevs.org/giveaways/${msg.id}`)
                .setStyle(ButtonStyle.Link)
        );
           await msg.edit({ embeds: [giveawayEmbed], components: [buttons], content: " "}).catch(async (err) => {
            const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
          return await interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
          });

        const giveaway = await global.giveawayModel.create({
            messageid: msg.id,
            prize: prize,
            timestamp: Date.now(),
            winners: winners,
            channelid: channel.id,
            time: dhms(time),
            hostedBy: interaction.user.id,
            guildid: interaction.guild.id
        }).then(
            await interaction.editReply({ content: `<:checkmark:1045963641406640148> **I have successfully made the giveaway in ${channel}.**`, ephemeral: true })
        )
        return;
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};