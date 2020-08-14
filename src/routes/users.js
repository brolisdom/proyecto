require('dotenv').config()

const { Router } = require('express')
const { isAuth } = require('../auth')

const nodemailer = require('nodemailer')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = Router()

const User = require('../models/User')

// router.get('/all', async(req, res) => {
//     const users = await User.find()
//     res.json(users)
// })

router.get('/', async(req, res) => {
    if(req.isAuthenticated()) res.json({ status: 200 })
    else res.json({ status: 401 })
}) 

router.get('/verified/:id', async(req, res) => {
    var error = false
    await User.findByIdAndUpdate(req.params.id, { _verified: true }, function(err,res){
        if(err) error = true
    })
    if(error){
        res.write(`<script>
        alert("No se pudo verificar tu cuenta")
        window.location.replace('/index.html')
        </script>`)
    }
    else{
        res.write(`<script>
        alert("Tu cuenta se ha verificado con exito!")
        window.location.replace('/index.html')
        </script>`)
    }
}) 

router.get('/data', isAuth, async(req, res) => {
    const user = await User.findOne({ _id: req.user._id})
    if(user) res.json(user)
    else res.json({ status: 404})
})

router.post('/signup', async(req, res) => {
    const { email, password } = req.body
    const userEmail = await User.findOne({ _email: email })
    if(userEmail){
        res.json({ status: 400 })
    } else{
        const newUSer = new User({ 
            _email: email, 
            _password: password, 
            _status: 'Normal',
            _name: '',
            _surname: '',
            _occupation: '',
            _tel: '',
            _date: '',
            _gender: '',
            _country: '',
            _scholarship: '',
            _institution: '',
            // _school: '',
            _provisional: '',
            _verified: false,
            _completed: false,
            _team: ''
        })

        var url = process.env.URL + newUSer._id
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'web.guerra14@gmail.com',
                pass: 'lumberjackatena98'
            }
        })
        var mailOptions = {
            from: 'web.guerra14@gmail.com',
            to: email,
            subject: 'Bienvenido a guerra de robots!',
            // text: 'Verifica aqui tu correo: '+url,
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body style="font-family: Open Sans, Arial;">
                <div class="container" style="background: #F6F6F6; width: 700px; display: block; margin: auto; border-bottom-left-radius: 70px;">
                    <div class="header" style="background: #5D2ABC; display: block; width: 700px; margin: auto; margin-top: 20px; position: relative;">
                        <h3 style="display: block; width: 90%; margin: auto; text-align: center; padding-bottom: 20px; padding-top: 20px; color: white; font-weight: 400; text-transform: uppercase; font-size: 16px;"> Rama Estidiantil IEEE UPIITA-IPN | Instituto Polit&eacute;cnico Nacional</h3>
                        <h3 style="display: block; width: 65%; margin: auto; text-align: center; color: white; font-weight: 400; text-transform: uppercase; font-size: 40px;"> GUERRA DE ROBOTS</h3>
                        <h3 style="display: block; width: 70%; margin: auto; text-align: center; padding-bottom: 20px; color: white; font-weight: 400; text-transform: uppercase; font-size: 16px;"> El torneo de r&oacute;botica internacional m&aacute;s importante de m&eacute;xico</h3>
                    </div>
                    <div class="content" style="width: 700px; display: block; margin: auto; margin-top: 40px; margin-bottom: 40px;">
                        <h3 style="font-weight: 600; text-align: center; color: #9E7FD7; font-size: 40px; margin-bottom: 10px;">${email}</h3>
                        <h3 style="font-weight: 600; text-align: center; color: #9E7FD7; font-size: 40px; margin-bottom: 10px;">Password: ${password}</h3>
                        <h4 class="welcome" style="font-weight: 500; margin-bottom: 20px; font-size: 26px; color: #2E155E; text-align: center;"> Gracias por registrarte y se bienvenid&#64; a este gran evento</h4>
                        <h4 style="text-align: center; font-weight: 400; font-size: 20px; color: #000000;"> Para continuar con esta aventura porfavor verifica tu correo electronico haciendo click en el siguiente botón</h4>
                        <a href="${url}" class="button" style="display: block; width: 200px; text-align: center; height: 50px; margin: auto; margin-top: 30px; margin-bottom: 30px; background: #5D2ABC; line-height: 45px; text-decoration: none; color: #DFD4F2; font-size: 16px; border-bottom-left-radius: 20px;"> Verifica mi cuenta</a>
                        <h4 style="text-align: center; font-weight: 400; font-size: 20px; color: #000000;">O copia y pega el siguiente link en el navegador para confirmar tu cuenta</h4>
                        <a class="link" style="margin: auto; width: 70%; display: block; text-align: center; color: #5D2ABC;font-size: 25px;">${url}</a><br>
                        <h4 style="text-align: center; font-weight: 400; font-size: 20px; color: #000000;">Tu contraseña ha sido encriptada y guardada en nuestra base de datos, conserva este correo en caso de que la llegues a olvidar</h4>
                    </div>
                    <div class="footer" style="background: #2E155E; color: #DFD4F2; text-align: center; padding: 20px; margin-bottom: 20px; border-bottom-left-radius: 70px;">
                        <h5 class="info" style="font-weight: 100; font-size: 16px;">Si no reconoces esta solicitud o tu no la has hecho, ignora este correo y porfavor ponte en contacto con nosotros: <b>correo@guerraderobots.mx</b></h5>
                        <h5>Guerra de Robots | &copy; 2020 Rama Estudiantil IEEE UPIITA-IPN</h5><h5><a href="#" style="text-decoration: none; color: #DFD4F2;">www.guerraderobots.mx</a></h5>
                    </div>
                </div>
            </body>
            </html>
            `
            // template: 'mail'
        };
        transporter.sendMail(mailOptions, async function(error, info){
            if(error) {
                console.log(error)
                res.json({ status: 400 })
            }else {
                const salt = await bcrypt.genSalt(11)
                newUSer._password = await bcrypt.hash(password, salt)
                await newUSer.save() 

                console.log('Email sent: ' + info.response)
                res.json({ status: 200 })
            }
        })
    } 
})

router.post('/login', async(req, res) => {
    const email = req.body.email
    const user = await User.findOne({ _email: email })
    if(user){
        if(user._verified){
            res.json({ status: 200 })
        } else res.json({ status: 401 })
    } else res.json({ status: 404 })
})

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/api/users/success',
    failureRedirect: '/api/users/failure'
}))

router.get("/auth/facebook", passport.authenticate("facebook", { scope : ['email'] }))

router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/dashboard.html",
    failureRedirect: "/"
}))

router.get("/auth/google", passport.authenticate("google", { scope : [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
] }))

router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "/dashboard.html",
    failureRedirect: "/"
}))

router.get('/failure', (req, res) => {
    res.json({ status: 400 })
})

router.get('/success', (req, res) => {
    res.json({ status: 200 })
})

router.put('/update', isAuth, async(req, res) => {
    const { name, surname, occupation, tel, date, gender, country, scholarship, institution, provisional } = req.body
    const user = await User.findOneAndUpdate({ _id: req.user._id }, {
        _name: name,
        _surname: surname,
        _occupation: occupation,
        _tel: tel,
        _date: date,
        _gender: gender,
        _country: country,
        _scholarship: scholarship,
        _institution: institution,
        _provisional: provisional,
        _completed: true,
        // _school: school,
        // _team: team
    })
    if(user) res.json({ status: 200 })
    else res.json({ status: 400 })
})

router.get('/logout', (req, res) => {
    req.logout()
    res.json({ status: 200 })
})

module.exports = router