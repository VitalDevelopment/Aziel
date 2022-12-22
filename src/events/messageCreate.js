const { Events, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message, client) {
    try {
    const data = await global.guildModel.findOne({ id: message.guild.id });
    if (!data) {
      return global.guildModel.create({ id: message.guild.id, name: message.guild.name, icon: message.guild.iconURL({ dynamic: true }) ?? 'https://discord.com/assets/dd4dbc0016779df1378e7812eabaa04d.png' })
    }
    let prefix = data.prefix ?? global.config.bot.prefix;

    const pingEmbed = new EmbedBuilder()
      .setTitle(`:wave: Heyo, I'm ${client.user.username}!`)
      .setColor("#39C6F1")
      .setDescription(`My prefix for this server is **${prefix}**\nRun **${prefix}help** for a full list of my commands.`)
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      message.channel.sendTyping();
      setTimeout(() => { return message.reply({ embeds: [pingEmbed] }); }, 500);
    }
    if (message.author.bot || !message.guild) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;


    let args = message.content.split(" ");
    let command = args.shift().slice(prefix.length).toLowerCase();
    let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;
    let checkBlacklist = await global.blacklistModel.findOne({ userid: message.author.id });
    if (checkBlacklist) {
      message.author.send("You have been **blacklisted** from using **Aziel**.\nMake an appeal: https://discord.gg/HrWe2BwVbd").catch(() => {});
      return message.react("❌")
    }
    try {
      if (message.channel.permissionsFor(message.guild.members.cache.get(client.user.id)).has(PermissionsBitField.Flags.SendMessages)) {
        if (data.disabledCommands.includes(command)) {
          const embed = new EmbedBuilder()
            .setTitle("<:xmark:1045967248038309970> Command Disabled")
            .setColor("#39C6F1")
            .setDescription("This command has been disabled by the server administrators.")
            .setFooter({ text: `${client.user.username} - Command Management`, iconURL: client.user.displayAvatarURL() })
          return await message.reply({ embeds: [embed] })
        }
        message.channel.sendTyping();
        setTimeout(async () => { 
        data.commandsRan = data.commandsRan + 1;
        await data.save();
        await cmd.run(client, message, args)
        }, 500);
      } else {
        try {
          message.author.send(`<:xmark:1045967248038309970> I don't have permission to send messages in <#${message.channel.id}>!\nPlease contact the owner to fix my permissions so I can work!`)
        } catch (err) {
          console.log(err)
        }
      }
    } catch (error) {
      console.error(error);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${error}\`\`\``)
      await message.reply({ embeds: [errorEmbed] });
    }
  } catch {};
  },
};
