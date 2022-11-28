//-Packages & Config-//
const mongoose = require('mongoose')
const express = require('express')
const helmet = require("helmet");
const client = global.client;
const config = global.config;
const session = require("express-session"),
  passport = require("passport"),
  Strategy = require("passport-discord").Strategy,
  SQLiteStore = require("connect-sqlite3")(session);

//-MongoDB Login-//
try {
mongoose.connect(config.mongo)
.then(console.info("Mongoose Connected"))
} catch(err) {
console.error(err)
}

//-Webserver-//
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.set('view engine', 'ejs');
app.set('views', './src/server/pages');
app.use(express.static("./src/server/pages/static"))

//-Alaways use protection!-//

var minifyHTML = require("express-minify-html-terser");
app.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
    },
  })
);

//-Passport Discord-//

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

var scopes = ["identify", "guilds"];
var prompt = "consent";

passport.use(
  new Strategy(
    {
      clientID: config.bot.clientid,
      clientSecret: config.bot.secret,
      callbackURL: config.bot.redirect,
      scope: scopes,
      prompt: prompt,
    },
    function (accessToken, _refreshToken, profile, done) {
      process.nextTick(function () {
        profile.tokens = {
          accessToken,
        };
        return done(null, profile);
      });
    }
  )
);

app.use(
  session({
    store: new SQLiteStore(),
    secret: "SupersercetratioskklnkWiOndy",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.get(
  "/auth/login",
  passport.authenticate("discord", {
    scope: scopes,
    prompt: prompt,
    callbackURL: config.bot.redirect,
  }),
  (req, res) => {
    if (req.query.from) req.session.returnTo = req.query.from;
  }
);

app.get(
  "/auth/callback",
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  function (req, res) {
    res.redirect(req.session.returnTo || "/"); 
  } 
);

app.get("/auth/info", async (req, res) => {
    return res.json(req.user);
  });
  
  app.get("/auth/logout", function (req, res) {
    req.logout(() => {
      res.redirect("/");
    });
    if (req.session.returnTo) {
      delete req.session.returnTo;
    }
  });

const dashRouter = require('./routers/dash.js');
app.use('/dashboard', dashRouter);
app.use('/dash', dashRouter);

app.get("/", (req, res) => {
    res.render("index.ejs", {
        bot: global.client,
        user: req.user,
        config: global.config,
    })
})

app.get("/invite", (req, res) => res.redirect("https://discord.com/api/oauth2/authorize?client_id=829896567963910164&permissions=4398046510967&scope=applications.commands%20bot"))
app.get("/discord", (req, res) => res.redirect("https://discord.gg/HrWe2BwVbd"))

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}.`)
})

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect(`/auth/login?from=${req.originalUrl}`);
  }