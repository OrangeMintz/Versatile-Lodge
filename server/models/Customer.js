const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
  },

  address: {
    type: String
  },

  image: {
    type: String
  },

  googleSign: {
    type: Boolean,
    default: "false"
  }
},
  { timestamps: true }
)

const CustomerModel = mongoose.model('Customer', customerSchema)

module.exports = CustomerModel;