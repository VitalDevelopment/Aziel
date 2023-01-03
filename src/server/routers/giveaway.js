const router = require('express').Router();

router.get('/:id', async (req, res) => {
    let giveaway = await global.giveawayModel.findOne({ messageid: req.params.id }).catch(() => {});
    if (!giveaway) return res.redirect("/404?error=No giveaway with that ID was found.");
    const guild = await global.client.guilds.fetch(giveaway.guildid).catch(() => {});
    if (!guild) return res.redirect(`/404?error=The server was not found.`);
    if (!guild.available) return res.redirect(`/404?error=The server isn't available, try again later.`);
    guild.iconUrl = guild.iconURL();
    giveaway.host = await global.client.users.fetch(giveaway.hostedBy).catch(() => {});

    return res.render("giveaways.ejs", {
        giveaway, guild,
        bot: global.client,
        user: req.user || null,
        date: new Date(Math.floor(giveaway.time + giveaway.timestamp)).toLocaleString("en-US")
    });
});

module.exports = router;

//SUPERCHIEFYT#0001 FIXED THIS BUT LETS PRETEND IT WAS markawes#0001
