const mongoose = require('mongoose');
const Schema = mongoose.Schema
const PLM = require('passport-local-mongoose')


const userSchema = new Schema ({
  username: String,
  email: String,
  photoURL: String,
  nombreGrupal: String,
  Telefono: String,
  generoMusical: String,
  TipoEvento: String,
  CostoMXN: String,
  notas: [{
    type: Schema.Types.ObjectId,
    ref: 'Nota'
  }],
  type:{
    type:String,
    enum:['MEXAUSUARIO', 'MEXASOCIO'],
    default: 'MEXAUSUARIO'
  },/*
  MEXASOCIO: {
    type:Boolean,
    default:false
  },*/
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey:false
})

module.exports = mongoose.model('User', userSchema.plugin(PLM, {usernameField: 'email'}))