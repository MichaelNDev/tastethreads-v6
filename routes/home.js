const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const { ensureAuthenticated } = require("../middleware/auth")
const upload = require('../middleware/multer')


router.get('/login', homeController.getLogin)
router.get('/register', homeController.getRegister)
router.get('/dashboard', ensureAuthenticated, homeController.dashboard)
router.get('/post/:id',ensureAuthenticated, homeController.getPost)
router.get("/logout", (req, res) => {
    req.logout(() => {
        console.log('User has logged out.')
    })
    // req.flash('success_msg', 'You are logged out')
    res.redirect('/login')
})

router.post('/register', homeController.postRegister)
router.post('/login', homeController.postLogin)
router.post('/post/:id/addreview', homeController.createReview)
// Missing upload.single("file") below.
router.post('/post', upload.single("file"), homeController.createPost)
router.put('/review/:id', ensureAuthenticated, homeController.updateReview)

router.delete("/deleteReview/:id", ensureAuthenticated, homeController.deleteReview)


router.get('/', (req,res) => {
   if(!req.isAuthenticated()) {
    res.render('index')   
   } else {
    res.redirect('/dashboard')
   }
})

module.exports = router