const mongoose = require('mongoose');
const Schema = mongoose.Schema
const PLM = require('passport-local-mongoose')


const userSchema = new Schema ({
  username: String,
  email: String,
  photoURL: String,
  notas: [{
    type: Schema.Types.ObjectId,
    ref: 'Nota'
  }],
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey:false
})

module.exports = mongoose.model('User', userSchema.plugin(PLM, {usernameField: 'email'}))