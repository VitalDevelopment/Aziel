const express = require('express');
const router = express.Router();

router.post('/webhook/vote', (req, res) => {

     console.log(req.body)
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