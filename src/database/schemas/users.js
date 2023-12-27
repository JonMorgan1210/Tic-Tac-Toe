const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    wins: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
    loses: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
    score: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
});

module.exports = mongoose.model("users", userSchema);