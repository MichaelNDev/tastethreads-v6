const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

// This is the User schema that contain username, email, password, and date for each user.

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        sparse: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// What this does is hashing the user/password
UserSchema.pre("save", function save(next) {
    const user = this
    if(!user.isModified("password")) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    })
})

// Bcrypt doing its thing, checking if passwords matches.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema, 'users')

