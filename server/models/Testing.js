const mongoose = require('mongoose')
const { Schema } = mongoose

const testingSchema = new Schema({
    name: {
        type: String,
    },

},
    { timestamps: true }
);


const TestingModel = mongoose.model('Testing', testingSchema)
module.exports = TestingModel;