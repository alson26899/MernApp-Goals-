const mongoose = require('mongoose');
const modelTypes = require('../enums/modelTypes')

const goalSchema = mongoose.Schema(
    {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: modelTypes.USER
        },
        text: {
            type: String,
            required: [true, 'Please add a text value']
        }
    }
    ,{
        timestamps: true
    }
)

module.exports = mongoose.model(modelTypes.GOAL, goalSchema);