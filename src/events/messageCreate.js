const { Events, PermissionsBitField } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	once: false,
	async execute(message, client) {

    if (message.author.bot || !message.guild) return;
    if (!message.content.toLowerCase().startsWith(global.config.bot.prefix))  return;

    let args = message.content.split(" ");
    let command = args.shift().slice(global.config.bot.prefix.length).toLowerCase();
    let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;
    try {
    if (message.channel.permissionsFor(message.guild.members.cache.get(client.user.id)).has(PermissionsBitField.Flags.SendMessages)) {
      cmd.run(client, message, args);
    } else {
        try {
        message.author.send(`<:xmark:1045967248038309970> I don't have permission to send messages in <#${message.channel.id}>!\nPlease contact the owner to fix my permissions so I can work!`)
        } catch(err) {
        console.log("oh well")
        }
    }
    } catch (error) {
      console.error(error);
   }
  
	},
};
