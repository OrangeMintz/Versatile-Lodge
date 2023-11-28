const mongoose = require('mongoose')
const { Schema } = mongoose

const archiveSchema = new Schema({
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


},
    { timestamps: true }
)

const ArchiveUsersModel = mongoose.model('ArchiveUsers', archiveSchema)

module.exports = ArchiveUsersModel;