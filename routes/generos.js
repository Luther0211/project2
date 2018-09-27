const express = require('express');
const router  = express.Router();

////**********************--GENEROS--**********************////


router.get('/generos', (req,res) => {
  res.render('genero/generos')
})


router.post('/generos',(req,res,next) => {

})



module.exports = router