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

    birthday: {
        type: String
    },


    phoneNumber: {
        type: String
    },

    sex: {
        type: String
    },

    isAdmin: Boolean,
    isManager: Boolean,
    isReceptionist: Boolean,
    isArchive: Boolean,



},
    { timestamps: true }
)

const AdminModel = mongoose.model('Admin', adminSchema)

module.exports = AdminModel;