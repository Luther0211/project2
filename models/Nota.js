const Schema = require('mongoose').Schema

const notaSchema = new Schema({
  title: String,
  body: String,
  photo: String,
  author: {
    type: Schema.Types.ObjectId,
    ref:"User"
  }
},{
  timestamps: {
    createdAt:'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = require('mongoose').model('Nota', notaSchema)