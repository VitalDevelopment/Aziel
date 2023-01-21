const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');


module.exports = {
  name: "counting",
  aliases: ["count"],
  category: "Fun",
  description: "Very cool counting system for Aziel.",
  async run(client, message, args) {

    if(args[0] == "channel") {
       const permissionsEmbed = new EmbedBuilder()
      .setColor("#39C6F1")
      .setDescription("<:xmark:1045967248038309970> You need the \"Manage Channels\" permission to use this command.");
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return message.reply({ embeds: [permissionsEmbed] });
    const argsEmbed = new EmbedBuilder()
    .setColor("#39C6F1")
    .setDescription("<:xmark:1045967248038309970> Please provide a correct channel mention or Id to set the counting channel.");
    if(!args[1]) return message.reply({ embeds: [argsEmbed] });
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
    if(!channel) return message.reply({ embeds: [argsEmbed] });
    const embed = new EmbedBuilder()
    .setTitle("Counting Channel")
    .setColor("#39C6F1")
    .setDescription("This channel has been selected as the new counting channel.\nYou can toggle the counting module off and on by using \`counting toggle\`.")
    .setFooter({
        text: `${client.user.username} - Counting System`,
        iconURL: client.user.displayAvatarURL(),
      });
      try {
        const guild = await guildModel.findOne({ id: message.guild.id });
        guild.countingChannel = channel.id;
        await guild.save();
        channel.send({ embeds: [embed] });
        message.reply(`The counting channel has been successfully set to ${channel}.`)
      } catch(err) {
        console.error(err);
        const errorEmbed = new EmbedBuilder()
          .setColor("#39C6F1")
          .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
        await message.reply({ embeds: [errorEmbed] });
      }
    } else if (args[0] == "toggle") {
    const permissionsEmbed = new EmbedBuilder()
    .setColor("#39C6F1")
    .setDescription("<:xmark:1045967248038309970> You need the \"Manage Guild\" permission to use this command.");
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.reply({ embeds: [permissionsEmbed] });
    const guild = await guildModel.findOne({ id: message.guild.id });
    if (!guild.countingChannel) return message.reply("Please set a counting channel with \`counting channel <channel mention or id>\` first.")
    if (guild.countingEnabled === true) {
        try {
       guild.countingEnabled = false;
       await guild.save();
       message.reply(`I have successfully **disabled** the counting system.`)
        } catch(err) {
            console.error(err);
            const errorEmbed = new EmbedBuilder()
              .setColor("#39C6F1")
              .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
            await message.reply({ embeds: [errorEmbed] });
          }
       } else {
        try {
            guild.countingEnabled = true;
            guild.countingNumber = "1";
            await guild.save();
            message.reply(`I have successfully **enabled** the counting system.`)
            const channel = message.guild.channels.cache.get(guild.countingChannel);
            channel.send("Counting system has been enabled, you may start with **2**.\n\n1")
             } catch(err) {
                 console.error(err);
                 const errorEmbed = new EmbedBuilder()
                   .setColor("#39C6F1")
                   .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
                 await message.reply({ embeds: [errorEmbed] });
               }
       }
    }
  },
};