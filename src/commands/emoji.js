const { EmbedBuilder, Utils } = require('discord.js')
const { parse } = require("twemoji-parser");

module.exports = {
    name: "emoji",
    aliases: ["addemoji", "steal"],
    category: "Uttilty",
    description: "Adds an emoji to the guild.",
    async run(client, message, args) {

         if(!args.length) return message.reply(":x: Please provide some emojis!")

         for (const rawEmoji of args) {
            const parsedEmoji = Utils.parseEmoji(rawEmoji)

            if (parsedEmoji.id) {
                const extension = parsedEmoji.animated ? "gif": "png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`
                message.guild.emojis
                .create({ url: url, name: parsedEmoji.name })
                .then((emoji) => message.reply(`Successfully added: \`${emoji.url}\``))
            }
         }
    },
  };