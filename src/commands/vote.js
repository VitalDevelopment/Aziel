const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
  name: "vote",
  category: "Info",
  aliases: ["voted"],
  description: "Find out how to vote for us.",
  async run(client, message, args) {
    try {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) user = message.author;
    
    /*const fetchedRadar = await fetch(`https://radarcord.net/api/hasvoted/${user.id}/${client.user.id}`);
    const radar = await fetchedRadar.json();
    if (radar.voted === 0) {
      radar.voted = `No`
    } if (radar.voted === 1) {
      radar.voted = `Yes`
    }
    console.log(radar)*/

    const fetchedTopgg = await fetch(`https://top.gg/api/bots/${client.user.id}/check?userId=${user.id}`, {
      method: 'GET',
      headers: {
        "Authorization": config.bot.topgg_key
      },
    });
    const topgg = await fetchedTopgg.json();
    if (topgg.voted === 0) {
      topgg.voted = `No`
    } if (topgg.voted === 1) {
      topgg.voted = `Yes`
    }

    const fetcheVoidBots = await fetch(`https://api.voidbots.net/bot/voted/${client.user.id}/${user.id}`, {
      method: 'GET',
      headers: {
        "Authorization": config.bot.vb_key
      },
    });
    const voidbots = await fetcheVoidBots.json();
    if (voidbots.voted === false) {
      voidbots.voted = `No`
    } if (voidbots.voted === true) {
      voidbots.voted = `Yes`
    }

    let has = "Has";
    if (user === message.author) has = "Have";
    if (user === message.author) user.username = "you";

     const embed = new EmbedBuilder()
     .setColor("#39C6F1")
     .setTitle(`${has} ${user.username} voted yet?`)
     .setDescription(`These are all of the botlists you can vote for ${client.user.username} on.`)
     .setThumbnail(client.user.displayAvatarURL())
     .addFields({ name: `VoidBots`, value: `Voted: **${voidbots.voted}**`, inline: true })
     //.addFields({ name: `Radarcord`, value: `Voted: **${radar.voted}**`, inline: true })
     .addFields({ name: `Top.gg`, value: `Voted: **${topgg.voted}**`, inline: true })
     const row = new ActionRowBuilder()
     .addComponents(
      new ButtonBuilder()
         .setURL(`https://top.gg/bot/${client.user.id}/vote`)
         .setLabel("Top.gg")
         .setEmoji("1064064348424781894")
         .setStyle(ButtonStyle.Link),
         /*new ButtonBuilder()
         .setURL(`https://radarcord.net/bot/${client.user.id}/vote`)
         .setLabel("Radarcord")
         .setEmoji("1064061619287625808")
         .setStyle(ButtonStyle.Link)*/
     )
     message.reply({ embeds: [embed], components: [row] })
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err.stack}\`\`\``)
      await message.reply({ embeds: [errorEmbed] });
    }
  },
};