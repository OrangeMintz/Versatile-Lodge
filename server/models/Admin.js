const mongoose = require('mongoose')
const { Schema } = mongoose

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    username: {
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

    image: {
        type: String
    },

    address: {
        type: String
    },

    phoneNumber: {
        type: String
    },

    baseSalary: {
        type: String
    },

    isEmployee: Boolean,
    isAdmin: Boolean,
    isManager: Boolean,

},
    { timestamps: true }
)

const AdminModel = mongoose.model('Admin', adminSchema)

module.exports = AdminModel;