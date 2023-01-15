const { EmbedBuilder } = require('discord.js')
const vitallist = require('vitallist.js');
const { Client } = require("vcodes.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const vClient = new Client("eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Zjb2Rlcy54eXoiLCJkYXRhIjp7ImlkIjoiODI5ODk2NTY3OTYzOTEwMTY0In0sImV4cCI6MTY3MjQ0MDk4MH0.aEToOFFsAO3u2Wj-ATbZXFrtn4wnafoKaRYimFCkFus")
module.exports = {
  name: "vote",
  category: "Info",
  aliases: ["voted"],
  description: "Find out how to vote for us.",
  async run(client, message, args) {
    try {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) user = message.author;
    const vl = await vitallist.checkVote(client.user.id, user.id);
    if (vl.voted === false) {
        vl.voted = `No`
    } if (vl.voted === true) {
        vl.voted = `Yes`
    }
    const fetchedRadar = await fetch(`https://radarcord.net/api/hasvoted/${user.id}/${client.user.id}`);
    const radar = await fetchedRadar.json();
    if (radar.voted === 0) {
      radar.voted = `No`
    } if (radar.voted === 1) {
      radar.voted = `Yes`
    }
    console.log(radar
      )
    var vC = await vClient.checkVote(user.id);
    if (vC === false) {
      vC = `No`
    } if (vC === true) {
      vC = `Yes`
    }
    let has = "Has";
    if (user === message.author) has = "Have";
    if (user === message.author) user.username = "you";

     const embed = new EmbedBuilder()
     .setColor("#39C6F1")
     .setTitle(`${has} ${user.username} voted yet?`)
     .setDescription(`These are all of the botlists you can vote for ${client.user.username} on.`)
     .setThumbnail(client.user.displayAvatarURL())
     .addFields({ name: `VitalList`, value: `Voted: **${vl.voted}**`, inline: true })
     .addFields({ name: `vCodes`, value: `Voted: **${vC}**`, inline: true })
     .addFields({ name: `Radarcord`, value: `Voted: **${radar.voted}**`, inline: true })
     const row = new ActionRowBuilder()
     .addComponents(
       new ButtonBuilder()
         .setURL(`https://vitallist.xyz/bots/${client.user.id}/vote`)
         .setLabel("VitalList")
         .setEmoji("1006506267319226368")
         .setStyle(ButtonStyle.Link),
         new ButtonBuilder()
         .setURL(`https://vcodes.xyz/bot/${client.user.id}/vote`)
         .setLabel("vCodes")
         .setEmoji("1064062017129951262")
         .setStyle(ButtonStyle.Link),
         new ButtonBuilder()
         .setURL(`https://radarcord.net/bot/${client.user.id}/vote`)
         .setLabel("Radarcord")
         .setEmoji("1064061619287625808")
         .setStyle(ButtonStyle.Link)
     )
     message.reply({ embeds: [embed], components: [row] })
    } catch (err) {
      console.error(err);
      const errorEmbed = new EmbedBuilder()
        .setColor("#39C6F1")
        .setDescription(`<:xmark:1045967248038309970> There was an error while executing this command! \n\`\`\`js\n${err}\`\`\``)
      await message.reply({ embeds: [errorEmbed] });
    }
  },
};