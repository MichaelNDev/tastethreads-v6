const User = require("../models/User")
const passport = require("passport")
const Post = require('../models/Post')
const Review = require('../models/Review')
const cloudinary = require('../middleware/cloudinary')

module.exports = {
    getLogin: (req,res) => {
        res.render("login.ejs")
    },
    getRegister: (req,res) => {
        res.render("register.ejs")
    },
    postRegister: (req,res) => {
        // object destructuring
        const { username, email, password, confirmPassword } = req.body

        // error msgs will be pushed here if occur
        let errors = []

        // check required fields
        if(!username || !email || !password || !confirmPassword) {
            errors.push({msg: 'Please fill in all fields.'})
        } else {

            // check passwords match
            if(password !== confirmPassword){
                errors.push({msg: 'Passwords do not match.'})
            }

            // check password length
            if(password.length < 6){
                errors.push({msg: 'Password should be at least 6 characters.'})
            }
        }
        
        // if any of the errors above have been pushed, refresh sign up page with flash error message 
        if(errors.length > 0){
            console.log(errors)
            // Renders register with the following properties from req.body
            res.render('register')
            // res.render("register", {
            //     errors,
            //     username,
            //     email,
            //     password,
            //     confirmPassword
            // })
        } else {
            // Validation passed
            // Finds an email from User model database
            User.findOne({email: email})
                .then(user => {
                    if(user) {
                        // If email already exists
                        errors.push({ msg: 'Email is already registered'})
                        res.render('register')
                        // res.render("register", {
                        //     errors,
                        //     username,
                        //     email,
                        //     password,
                        //     confirmPassword
                        // })
                    } else {
                        // Create a new user with username, email, password
                        const newUser = new User({
                            username,
                            email,
                            password
                        })
                        // save new user to database
                        newUser.save()
                            .then(user => {
                                console.log("User data saved")
                                // req.flash("sucess_msg", "You are now registered and can log in.")
                                res.redirect("/login")
                            })
                            .catch(err => console.log(err))
                    }
                })
        }
    },
    // Checks authentication after login attempt
    postLogin: (req,res,next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            // failureFlash: true
        })(req, res, next)
    },
    dashboard: async (req,res) => {
        try {
            // populate is an interesting method add to anki
            const posts = await Post.find().populate('userId')
            res.render('dashboard', {posts: posts})
            console.log(posts)
        } catch(err) {
            console.log(err)
        }
    },
    createPost: async (req,res) => {

        try {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            // find the user who created the post
            const thisUser = await User.findById(req.user._id)
            const newPost = new Post(
                {
                    titleinput: req.body.titleinput,
                    meats: req.body.meats,
                    city: req.body.city,
                    restaurant: req.body.restaurant,
                    imageurl: result.secure_url,
                    cloudinaryId: result.public_id,
                    userId: thisUser._id,
                    user: thisUser.username
                }
            )
            await newPost.save()
            console.log(newPost)
            console.log('Post has been added')
            res.redirect('/dashboard')
        } catch(err) {
            if (err) return res.status(500).send(err)
            res.redirect("/dashboard")
        }
    },
    getPost: async (req,res) => {
        try {
            // store the post I want inside a variable to access all its info in the ejs later
            const thisPost = await Post.findById(req.params.id).populate('userId')
            // variable contains all reviews associated with the post ID
            const thisReview = await Review.find({postId: req.params.id})
            const thisUser = req.user.username
            console.log(thisReview)
            res.render("post", {currentPost: thisPost, reviews: thisReview, currentUser: thisUser})
        } catch(err) {
            console.log(err)
        }
    },
    createReview: async (req,res) => {
        const newReview = new Review(
            {   
                postId: req.body.postId,
                title: req.body.title,
                rating: req.body.rating,
                comment: req.body.comment,
                user: req.user.username,
            }
        )

        try {
            await newReview.save()
            console.log(newReview)
            res.redirect(req.get('referer'))
        } catch(err) {
            console.log(err)
        }
    },
    deleteReview: async (req,res) => {
        try {
            await Review.findByIdAndDelete({_id: req.params.id})
            console.log('Review deleted successfully.')
            res.redirect(req.get('referer'))
        } catch(err) {
            console.log(err)
        }
    }
}