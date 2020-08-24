const {Schema, model} = require('mongoose');


const userSchema = new Schema(
    {
        owner: {
            type: String,
            required: true,
        },
        members: {
            type: Array,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model('groups', userSchema); ;