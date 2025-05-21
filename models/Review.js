const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        Required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('review', reviewSchema, 'review')