const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "toggle",
    aliases: ["cmd"],
    category: "Config",
    description: "Disables/Enables a command for this server.",
    async run(client, message, args) {

        const data = await global.guildModel.findOne({ id: message.guild.id });
       if(!args[0]) {
        const embed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription('<:xmark:1045967248038309970> Please provide me with a command to disable.')
        return message.reply({ embeds: [embed] });
       }
       
       command = client.commands.get(args[0]);
       if(!command) {
        const embed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription('<:xmark:1045967248038309970> That is not one of my commands!')
        return message.reply({ embeds: [embed] });
       }
       const embed = new EmbedBuilder()
       .setColor("#39C6F1")
       .setTitle("<:xmark:1045967248038309970> Nice try!")
       .setDescription('Sorry, but you cannot disable the toggle command.\nUnless you want the bot to break, you choice.')
       if(command.name == "toggle") return message.reply({ embeds: [embed] });

       try {
       if(data.disabledCommands.includes(command.name)) {
        data.disabledCommands.splice(data.disabledCommands.indexOf(args[0]), 1);
        await data.save();
        const embed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setTitle("<:checkmark:1045963641406640148> Successfully Enabled")
        .setDescription(`I have successfully enabled the command \`${command.name}\`.`)
         return message.reply({ embeds: [embed] })
       } else {
      data.disabledCommands.push(args[0])
      await data.save();
      const embed = new EmbedBuilder()
      .setColor("#39C6F1")
      .setTitle("<:checkmark:1045963641406640148> Successfully Disabled")
      .setDescription(`I have successfully disabled the command \`${command.name}\`.`)
       return message.reply({ embeds: [embed] })
      }
       } catch(err) {
        console.error(err);
        const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
        await message.reply({ embeds: [errorEmbed] });
     }
    },
  };