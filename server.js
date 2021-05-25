// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').load()
// }
const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index') // importing index.js from routes folder
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


// mongoose connection 
const mongoose = require('mongoose')
const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/mystore'
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => { console.log('Connected to database!!') })


app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)



app.listen(process.env.PORT || 3000, () => {
    console.log("Listening  to port 3000!!")
})