const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "config",
    aliases: ["set"],
    category: "Uttilty",
    description: "Config the server variables for the bot.",
    async run(client, message, args) {

        if(!args[0]) {
            const embed = new EmbedBuilder()
            .setTitle('<:xmark:1045967248038309970> Config what?')
            .setColor("#39C6F1")
            .setDescription("Please provide something to config.\n`")
            message.reply({ embeds: [embed] })
        }
    },
  };