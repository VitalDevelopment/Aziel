const { EmbedBuilder, parseEmoji, PermissionsBitField  } = require('discord.js')
const { parse } = require("twemoji-parser");

module.exports = {
    name: "emoji",
    aliases: ["addemoji", "steal"],
    category: "Utility",
    description: "Adds an emoji to the guild.",
    async run(client, message, args) {

        const permissionsEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription("**<:xmark:1045967248038309970> You need the \"Manage Emojis\" permission to use this command.**");
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return message.reply({ embeds: [permissionsEmbed] });
         if(!args.length) return message.reply("<:xmark:1045967248038309970> Please provide some emojis!")
        try {
            const array = [];
            for (const rawEmoji of args) {
                const parsedEmoji = parseEmoji(rawEmoji)
    
                if (parsedEmoji.id) {
                    const extension = parsedEmoji.animated ? ".gif": ".png";
                    const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                    message.guild.emojis
                    .create({ attachment: url, name: parsedEmoji.name } )
                    .then((emoji) => {
                    const embed = new EmbedBuilder()
                    .setColor("#39C6F1")
                    .setDescription(`<:checkmark:1045963641406640148> Successfully added: ${emoji}`)
                      return message.reply({ embeds: [embed] })
                    })
                }
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