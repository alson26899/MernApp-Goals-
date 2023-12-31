const mongoose = require('mongoose');
const modelTypes = require('../enums/modelTypes');

const userSchema = mongoose.Schema(
    {
        name: {
           type: String,
           required: [true, 'Please add a name'] 
        },
        email: {
            type: String,
            required: [true, 'Please add a email'] ,
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password'] 
        }
    }
    ,{
        timestamps: true
    }
)

module.exports = mongoose.model(modelTypes.USER, userSchema);