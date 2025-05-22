const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
	titleinput: {
		type: String,
		required: true
	},
	meats: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	restaurant: {
		type: String,
		required: true
	},
	imageurl: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User", // This tells Mongoose what model this ObjectId refers to
		required: true
  	},
	cloudinaryId: {
		type: String,
		require: true
	},
	
	
})

module.exports = mongoose.model('post', postSchema, 'post')