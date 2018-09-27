const router = require('express').Router()
const Coment = require('../models/Coment')
const User = require('../models/User')
const uploadCloud = require('../helpers/cloudinary')



//detalle del post
router.get("/coment/:id", (req, res, next) => {
  const { id } = req.params;
  Coment.findById(id)
    .populate("user")
    .then(coment => {
      Comment.find({ coment: coment._id })
        .populate("user")
        .then(coments => {
          let isOwner = false;
          if (req.user._id == coment.user._id) isOwner = true;
          res.render("coment/coments", {
            coment: coment,
            owner: isOwner,
            coments: coments
          });
        })
        .catch(e => {
          console.log(e);
        });
    })
    .catch("/coment");
});

router.post("/coment/:id", uploadCloud.single("image"), (req, res, next) => {
  const { id } = req.params;
  if (req.file) req.body["imageURL"] = req.file.url;
  Coment.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(coment => {
      res.redirect(`/coment/coments/${coment._id}`);
    })
    .catch(e => {
      res.redirect("/");
    });
});

router.post('/detail/:id/comments',(req, res, next)=>{
  const {id} = req.params
  req.body['uoment'] = id
  req.body['user'] = req.user._id
  Coment.create(req.body)
    .then(coment=>{
      res.redirect(`/coments/coment/${id}`)
    }).catch(e=>{
      console.log(e)
    })
    .catch(e => {
      console.log(e);
    });
});



module.exports = router



