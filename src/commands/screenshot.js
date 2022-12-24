const { EmbedBuilder } = require('discord.js')
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  name: "screenshot",
  aliases: ["ss", "website"],
  category: "Info",
  description: "Shows a screen shot of a website.",
  async run(client, message, args) {
    try {
        if(!args[0]) return message.reply("Please provide a website link.")
      const mesg = await message.reply({ content: "<a:loading:1046294092432277525> Executing Command..." });
      const res = await fetch(`https://image.thum.io/get/auth/66351-azielbot/${args[0]}`);
      if(res) {
       const embed = new EmbedBuilder()
       .setTitle("Screen Shot")
       .setColor("#39C6F1")
       .setImage(`https://image.thum.io/get/auth/66351-azielbot/${args[0]}`)
       await mesg.edit({ embeds: [embed]})
      } else {
        //-panic-//
      }
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await mesg.edit({ embeds: [errorEmbed] });
    }

  },
};