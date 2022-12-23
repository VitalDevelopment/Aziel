const express = require('express');
const { PermissionsBitField, ChannelType } = require('discord.js')
const router = express.Router();

router.get('/', checkAuth, (req, res) => {

     res.render("dash/index.ejs", {
      user: req.user,
      perms: PermissionsBitField,
      bot: global.client,
     })
  })

  router.get('/:id', checkAuth, async (req, res) => {
    const guild = await client.guilds.cache.get(req.params.id);
    if (!guild) return res.redirect("/404");

    try {
      const member = await guild.members.fetch(req.user.id);
      if(!member) return res.redirect("/404?message=403 Forbidden");
  
    if (!member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
        return res.redirect("/dashboard");
      }
    } catch(err) {
      res.status(403).redirect("/404?message=403 Forbidden")
    }

     let data = await global.guildModel.findOne({ id: guild.id });
     if (!data) {
       const newGuild = new global.guildModel({
         id: guild.id, name: guild.name, icon: guild.iconURL({ dynamic: true })
       });
       await newGuild.save().catch((e) => {
         console.error(e);
       });
       data = await global.guildModel.findOne({ id: guild.id });
     }
    const botMember = await guild.members.fetch(global.client.user.id)
    data.nickname = botMember.displayName;

    res.render("dash/guild.ejs", {
     guild,
     user: req.user,
     settings: data,
     bot: global.client,
     type: ChannelType,
     alert: null,
    })
 })

 router.post("/:id", checkAuth, async (req, res) => {
  const guild = await client.guilds.cache.get(req.params.id);
    if (!guild) return res.redirect("/dashboard");

    const member = await guild.members.fetch(req.user.id);
    if(!member) return res.redirect("/dashboard");

  if (!member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      return res.redirect("/dashboard");
    }

   let data = await global.guildModel.findOne({ id: guild.id });
   if (!data) {
     const newGuild = new global.guildModel({
       id: guild.id, name: guild.name, icon: guild.iconURL({ dynamic: true })
     });
     await newGuild.save().catch((e) => {
       console.log(e);
     });
     data = await global.guildModel.findOne({ id: guild.id });
   }

   data.prefix = req.body.prefix;
   data.welcomeAndLeave = req.body.welcomeAndLeave;
   data.welcomeMessage = req.body.welcomeMessage;
   data.welcomeChannel = req.body.welcomeChannel;
   data.leaveMessage = req.body.leaveMessage;
   data.leaveChannel = req.body.leaveChannel;
   await data.save().catch((e) => {
     console.log(e);
   });

   const botMember = await guild.members.fetch(global.client.user.id)
   botMember.setNickname(req.body.nickname, { reason: "Was set on the dashboard." });
   data.nickname = req.body.nickname;

   res.render("dash/guild.ejs", {
     guild,
     bot: global.client,
     settings: data,
     alert: "Your settings have been saved successully.",
     type: ChannelType,
     user: req.user,
   });
 })
 
module.exports = router;

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect(`/auth/login?from=${req.originalUrl}`);
}