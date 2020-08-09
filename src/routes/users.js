const { Router } = require('express')
const { isAuth } = require('../auth')

const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = Router()

const User = require('../models/User')

// router.get('/all', async(req, res) => {
//     const users = await User.find()
//     res.json(users)
// })

router.get('/', async(req, res) => {
    if(req.isAuthenticated()){
        res.json({ status: 200 })
    } else{
        res.json({ status: 401 })
    }
}) 

router.get('/data', isAuth, async(req, res) => {
    const user = await User.findOne({ _id: req.user._id})
    if(user){
        res.json(user)
    } else{
        res.json({ status: 404})
    }
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
            _scholar: '',
            _institution: '',
            _school: '',
            _team: ''
        })
        const salt = await bcrypt.genSalt(11)
        newUSer._password = await bcrypt.hash(password, salt)
        await newUSer.save() 
        res.json({ status: 200 })
    } 
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
    const { name, tel, date, gender, country, scholar, institution, school } = req.body
    const user = await User.findOneAndUpdate({ _id: req.user._id }, {
        _name: name,
        _surname: '',
        _occupation: '',
        _tel: tel,
        _date: date,
        _gender: gender,
        _country: country,
        _scholar: scholar,
        _institution: institution,
        _school: school
        // _team: team
    })
    if(user){
        res.json({ status: 200 })
    } else{
        res.json({ status: 400 })
    }
})

// funciona pero no en el navegador
router.get('/logout', (req, res) => {
    req.logout()
    res.json({ status: 200 })
})

module.exports = router