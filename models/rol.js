const { Schema, model } = require('mongoose')

const RolSchema = new Schema({

  rol: {
    type: String,
    required: [true, 'Rol is mandatory']
  }
})

module.exports = model('Rol', RolSchema)