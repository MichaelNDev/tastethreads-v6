const express = require('express')
const app = express()
require("dotenv").config({ path: "./config/.env"})
const PORT = process.env.PORT
const SECRET = process.env.SECRET
const session = require('express-session')
// const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const homeRoutes = require('./routes/home')
const connectDB = require('./config/database')
const passport = require('passport')
require("./config/passport")(passport)


connectDB()

app.use(session({
	secret: SECRET,
    resave: false,
    saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: process.env.DB_STRING}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/", homeRoutes)

app.listen(PORT, () => console.log('Server is up and running!'))