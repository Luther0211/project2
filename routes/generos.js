const express = require('express');
const router  = express.Router();
const Nota = require('../models/Nota')

////**********************--GENEROS--**********************////


router.get('/generos', (req,res) => {
  console.log(req.query.genre)
  Nota.find({generoMusical:req.query.genre})
    .then(notas=>{
      console.log(notas)
      res.render('genero/generos',{notas})
    })


 //res.render('genero/generos')

  


})


router.post('/generos',(req,res,next) => {

})

////**********************--GENEROS-ROCK--**********************////








module.exports = router