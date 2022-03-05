if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require("express");  
const app = express();
const expresslayouts = require("express-ejs-layouts") 

const methodOverride = require('method-override')
const indexRouter = require("./routes/index")
const authorRouter = require("./routes/authors")
const bodyParser = require('body-parser')
const bookRouter = require('./routes/books')

const mongoose = require("mongoose");  //import mongoose db
mongoose.connect(process.env.DATABASE_URL, {    //connected to DB on web
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error)) //accessing db for logging errors
db.once('open', () => console.log('Connected to Mongoose'))
app.use('/', indexRouter)
 
app.set("view engine", "ejs")    //set up the view engine ejs
app.set("views", __dirname + "/views")  //All views file will be in views folder
app.set("layout", "layouts/layout") //set up layouts folder
app.use(expresslayouts)           // use layouts
app.use(express.static("public")) //take all my static files from public, like images, css,..
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(methodOverride('_method'))

//app.use("/", indexRouter)
app.use("/authors", authorRouter)
app.use('/books', bookRouter)


app.listen(process.env.PORT || 3000) //we pull port from env variable, and server gonna tell use which port to listen to


