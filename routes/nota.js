const router = require('express').Router()
const Nota = require('../models/Nota')
const User = require('../models/User')
const uploadCloud = require('../helpers/cloudinary')


const isLogged = (req,res,next) => {
  if(req.isAuthenticated()) next()
  else res.redirect('/login')
}
router.get('/create_new', isLogged, (req,res) => {
  res.render('nota/create_new')
})

router.post('/create_new',uploadCloud.single('photo'), (req,res,next) => {
  Nota.create({...req.body, photo: req.file.url, author: req.user._id })///////////////////////
  .then(nota => {
    User.findByIdAndUpdate(req.user._id, { $push: { notas: nota._id } }, { new: true })
    .then(user => {
      console.log(user)
      req.app.locals.loggedUser = user
      res.redirect('/profile')
    })
  })
})

module.exports = router