const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAILPASS
  }
})

exports.welcomeMail=(username, email)=>{
  
  transporter.sendMail({
    from:'MEXA',
    to:email,
    subject:'Welcome',
    html:`
      <h2>Welcome ${username}, tu registro ah sido completado</h2>
    `
  }).then(info=>{
    console.log(info)
  }).catch(error=>{
    console.log(error)
    throw error
  })

}