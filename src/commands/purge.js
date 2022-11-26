const { EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    name: "purge",
    aliases: ["clear"],
    category: "Mod",
    description: "Purges a amount of messages in a channel.",
    async run(client, message, args) {
    try {
    const errorEmbed = new EmbedBuilder()
    .setColor("#39C6F1")
    .setDescription("**<:xmark:1045967248038309970> You need the \"Manage Messages\" permission to use this.**");
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply({ embeds: [errorEmbed] });
    const error2Embed = new EmbedBuilder()
    .setColor("#39C6F1")
    .setDescription("**<:xmark:1045967248038309970> You must provide a **number** of messages to delete.**");
    if(!args[0]) return message.reply({ embeds: [error2Embed] });
    let amount = parseInt(args[0]);
    if(isNaN(amount)) return message.reply({ embeds: [error2Embed] });
    const error3Embed = new EmbedBuilder()
    .setColor("#39C6F1")
    .setDescription("**<:xmark:1045967248038309970> You can only delete up to 99 messages at a time.**");
    if(amount > 99) return message.reply({ embeds: [error3Embed] });
    if(amount < 1) return message.reply({ embeds: [error2Embed] });
    if (message.channel.permissionsFor(message.guild.members.cache.get(client.user.id)).has(PermissionsBitField.Flags.ManageMessages)) {
        await message.channel.messages.fetch({ limit: amount+1 }).then(messages => {
            message.channel.bulkDelete(messages)
            const embed = new EmbedBuilder()
            .setColor("#39C6F1")
            .setDescription(`**<:checkmark:1045963641406640148> I have successfully purged ${amount} messages.**`)
            message.channel.send({ embeds: [embed] }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
              })
        });
      } else {
        const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription("<:xmark:1045967248038309970> I don't have the \"**Manage Messages**\" permission.\nPlease fix my permissions, then run the command again.");
        message.reply({ embeds: [errorEmbed] })
      }
    } catch (err) {
    console.error(err);
    const errorEmbed = new EmbedBuilder()
    .setColor("#39C6F1")
    .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await message.channel.send({ embeds: [errorEmbed] });
      }
    },
  };