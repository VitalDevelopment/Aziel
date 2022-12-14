const express = require('express');
const router = express.Router();

router.get('/', checkAuth, checkStaff, (req, res) => {

     res.render("panel/index.ejs", {
      user: req.user,
      bot: global.client,
      alert: null,
     })
  })

  router.post('/blacklistGuild', checkAuth, checkStaff, async (req, res) => {
    const data = req.body;

    if(!data) return res.status(400).json({ message: "Please complete all data."})
try {
    const guild = await global.client.guilds.fetch(data.id);
    if(!guild) return res.status(400).json({ message: "Not a real guild on Discord."})

    let model = await global.blacklistModel.create({
        guildid: data.id,
        reason: data.reason,
        staffid: req.user.id,
        timestamp: Date.now()
    })
   const owner = await client.users.fetch(guild.ownerId);
    owner.send(`Your server **${guild.name}** has been blacklisted from using **${global.client.user.username}**.\n**Reason**: ${data.reason}`).catch(() => {});
   res.render("panel/index.ejs", {
    bot: global.client,
    alert: `You have successully blacklisted ${guild.name}.`,
    user: req.user,
  });
} catch(err) {
    console.log(err)
}
})

router.post('/blacklistUser', checkAuth, checkStaff, async (req, res) => {
    const data = req.body;

    if(!data) return res.status(400).json({ message: "Please complete all data."})
try {
    const user = await global.client.users.fetch(data.id);
    if(!user) return res.status(400).json({ message: "Not a real user on Discord."})

    let model = await global.blacklistModel.create({
        userid: data.id,
        reason: data.reason,
        staffid: req.user.id,
        timestamp: Date.now()
    })
    user.send(`You have been **blacklisted** from using **${global.client.user.username}**.\n**Reason**: ${data.reason}`).catch(() => {});

   res.render("panel/index.ejs", {
    bot: global.client,
    alert: `You have successully blacklisted ${user.username}.`,
    user: req.user,
  });

} catch(err) {
    console.log(err)
}
})
 
module.exports = router;

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect(`/auth/login?from=${req.originalUrl}`);
}

function checkStaff(req, res, next) {
    if(global.config.staff.includes(req.user.id)) return next();
    res.status(404);
}