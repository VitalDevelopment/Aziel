const { EmbedBuilder, PermissionsBitField } = require('discord.js');


module.exports = {
    name: "prefix",
    aliases: ["pre"],
    category: "Config",
    description: "Displays server prefix, \`prefix set \"!\"\` sets the prefix.",
    async run(client, message, args) {

        const data = await global.guildModel.findOne({ id: message.guild.id }); 

       if(!args[0]) {
        const embed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setTitle("<:confused:1046196237663211620> Hello World?")
        .setDescription("You kinda just used the prefix to run the command.\nI guess it's normal human behavior though.")
        .addFields({ name: "Server Prefix:", value: `\`\`\`${data.prefix}\`\`\`` ?? `\`\`\`${global.config.bot.prefix}\`\`\``, inline: true })
        .addFields({ name: "Default Prefix:", value: `\`\`\`${global.config.bot.prefix}\`\`\``, inline: true })
        .setFooter({
            text: `${client.user.username} - Prefix Management`,
            iconURL: client.user.displayAvatarURL(),
          });
        return message.reply({ embeds: [embed] });
       }
       if(args[0] == "set") {
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return null;
        if(!args[1]) {
        const embed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription("**<:xmark:1045967248038309970> Please provide me with a prefix to set.**")
        .addFields({ name: "Example:", value: `\`\`\`${data.prefix ?? global.config.bot.prefix}prefix set !\`\`\``})
        message.reply({ embeds: [embed] })
        }
        if(args[1].length  > 5) {
        const embed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription("**<:xmark:1045967248038309970> The prefix must be below 5 characters.**")
        .addFields({ name: "Example:", value: `\`\`\`${data.prefix ?? global.config.bot.prefix}prefix set !\`\`\``})
        message.reply({ embeds: [embed] })
        }
        try{
        data.prefix = args[1];
        await data.save()
        const embed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setTitle("<:checkmark:1045963641406640148> Prefix Set Successfully")
        .setDescription(`The prefix for this guild has been successfully set to \`${args[1]}\`.`)
        .setFooter({
            text: `${client.user.username} - Prefix Management`,
            iconURL: client.user.displayAvatarURL(),
          });
        message.reply({ embeds: [embed] })
        } catch(err) {
            console.error(err);
            const errorEmbed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
            await message.channel.send({ embeds: [errorEmbed] });
        }
      } else {
        const embed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setTitle("<:confused:1046196237663211620> Hello World?")
        .setDescription("You kinda just used the prefix to run the command.\nI guess it's normal human behavior though.")
        .addFields({ name: "Server Prefix:", value: `\`\`\`${data.prefix}\`\`\`` ?? `\`\`\`${global.config.bot.prefix}\`\`\``, inline: true })
        .addFields({ name: "Default Prefix:", value: `\`\`\`${global.config.bot.prefix}\`\`\``, inline: true })
        .setFooter({
            text: `${client.user.username} - Prefix Management`,
            iconURL: client.user.displayAvatarURL(),
          });
        return message.reply({ embeds: [embed] });
      }
    },
  };