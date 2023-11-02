const mongoose = require('mongoose');

const branchschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    
    city:{
        type: String,
        required: true
    },
    
    address:{
        type: String,
        required: true
    },

    rooms:{
        type: [String],
    },
},
    {timestamps: true}
);

module.exports = mongoose.model('Branch', branchschema);