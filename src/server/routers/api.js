const express = require('express');
const router = express.Router();

router.post('/webhook/vote', (req, res) => {

     console.log(req.body)
  })
 
module.exports = router;
