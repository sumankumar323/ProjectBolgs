const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        require: true
    },
    emailId: String,
    password: String,
    gender: {
        type: String,
        enum: ["male", "famle", "other",]
    },
    age: Number,
    posts: { type: [], deafult: [] }
}, { timestamps: true });

module.exports = mongoose.model('ironman', userSchema)