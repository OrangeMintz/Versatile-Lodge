const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  address: {
    type: String
  },

  photo: {
    type: String
  }
},
  { timestamps: true }
)

const CustomerModel = mongoose.model('Customer', customerSchema)

module.exports = CustomerModel;