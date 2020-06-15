const { Router } = require('express')
const { isAuth } = require('../auth')

const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = Router()

const User = require('../models/User')

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

// router.get('/all', async(req, res) => {
//     const users = await User.find()
//     res.json(users)
// })

router.post('/signup', async(req, res) => {
    const undefined = 'Sin definir'
    const { email, password } = req.body
    const userEmail = await User.findOne({ _email: email })
    if(userEmail){
        res.json({ status: 400 })
    } else{
        const newUSer = new User({ 
            _email: email, 
            _password: password, 
            _status: 'Sin registrar',
            _name: undefined,
            _tel: undefined,
            _date: undefined,
            _gender: undefined,
            _country: undefined,
            _scholar: undefined,
            _institution: undefined
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

router.get('/failure', (req, res) => {
    res.json({ status: 400 })
})

router.get('/success', (req, res) => {
    res.json({ status: 200 , user: req.user._id})
})

router.put('/update', isAuth, async(req, res) => {
    const { name, tel, date, gender, country, scholar, institution } = req.body
    const user = await User.findOneAndUpdate({ _id: req.user._id }, {
        _name: name,
        _tel: tel,
        _date: date,
        _gender: gender,
        _country: country,
        _scholar: scholar,
        _institution: institution
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

// delete/:id
// update/:id
// searchBy.../:params

module.exports = router