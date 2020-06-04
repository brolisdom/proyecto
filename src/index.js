require('dotenv').config()
// solo en produccion
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const app = express()
require('./passport')

// database
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Base de datos conectada.'))
.catch(e => console.error(e))

// settings
app.set('port', process.env.PORT)
app.use(session({
    secret: 'keyword',
    resave: true,
    saveUninitialized: true
}))
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename(req, file, res){
        res(null, new Date().getTime() + path.extname(file.originalname))
    }
})

// middlewares
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(multer({storage}).single('image'))
app.use(morgan('dev'))
app.use(flash())
app.use(cors())

// routes
app.use('/api/users', require('./routes/users'))
app.use('/api/robots', require('./routes/robots'))
app.use('/api/members', require('./routes/members'))


// static files
app.use(express.static(path.join(__dirname, '../public')))

// start server
app.listen(app.get('port'), () =>{
    console.log('Servidor activo en port: ', app.get('port'));
})


