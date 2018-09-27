const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
const uploadCloud = require('../helpers/cloudinary')
const welcomeMail = require('../helpers/mailer').welcomeMail



//logged verification
const isLogged = (req,res,next) => {
  if(req.isAuthenticated()) next()
  else res.redirect('/login')
}

////**********************--SIGN UP--**********************////
router.get('/signup', (req,res) => {
  configuration = {
    title: 'Sign Up',
    btnValue: "crear cuenta",
    url: '/signup',
    password: true,
    id: ""
  }
  res.render('auth/signup', configuration)
})

////

router.post('/signup',(req,res,next) => {
  const {username, email} = req.body
  User.register(req.body, req.body.password)
  .then(user => {
    welcomeMail(username, email)
    res.redirect('/login')
  }).catch(error=>{
    console.log(error)
    res.render('auth/signup',{data:req.body,error})
  })
})


////**********************--LOG IN--**********************////
router.get('/login', (req,res) => {
  if(req.user)req.logOut()
  res.render('auth/login')
})

///

router.post('/login', passport.authenticate('local'), (req,res,next) => {
  req.app.locals.loggedUser = req.user;
  res.redirect('/profile')
})


////**********************--PROFILE--**********************////

router.get('/profile', isLogged, (req,res) => {
  User.findById(req.app.locals.loggedUser._id).populate('notas')
 .then(usuario => {
   console.log(usuario)
   res.render('profile', usuario) // lo que le tengo que pasar aqui, es un objeto.
   })
   .catch(error => console.log(error))
 })

 ////***********--PROFILE-EDIT--***********////

 router.get('/edit/:id',  isLogged,(req,res) => {
   if(req.user.type == 'MEXASOCIO'){
    res.render('edit_socio', req.app.locals.loggedUser)
   }else{
    res.render('edit_usuario', req.app.locals.loggedUser) 
   }
})

router.post("/edit/:id", (req,res,next) => {
  let {id} = req.params;
  User.findByIdAndUpdate(id, {...req.body}, {new: true})
  .then(user => {
    req.app.locals.loggedUser = user
    res.redirect('/profile')
  })
  .catch(e => next(e))
})

 ////***********--PROFILE-IMAGE--***********////
router.get('/edit_image', isLogged, (req,res) => {
  res.render('edit_image')
})

router.post('/edit_image', isLogged, uploadCloud.single('photoURL'), (req,res,next) => {
  User.findByIdAndUpdate(req.app.locals.loggedUser._id, {photoURL: req.file.url}, {new: true})
  .then(user => {
    req.app.locals.loggedUser = user
    console.log(user)
    res.redirect('/profile')
  })
  .catch(e => next(e))
})

module.exports = router