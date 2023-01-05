const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
   let giveaway = await global.giveawayModel.findOne({ messageid: req.params.id });
   if(!giveaway) res.redirect("/404?message=Giveaway Id does not exist.");
    let guild = await client.guilds.fetch(giveaway.guildid)
    if(!guild) res.redirect("/404?message=This server has no giveaways");
     guild.iconURL = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
     giveaway.host = await client.users.fetch(giveaway.hostedBy);

    res.render("giveaways.ejs", {
        giveaway,
        guild,
        bot: global.client,
        user: req.user || null
    })
  })
 
module.exports = router;
 