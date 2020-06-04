const { Router } = require('express')
const router = Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

function isAuth(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.json({ status: 401 });
    }
}
 
router.get('/', isAuth) 

router.get('/data', isAuth, async(req, res) =>{
    const user = await User.findOne({ _id: req.user._id})
    if(user){
        res.json(user)
    } else{
        res.json({ status: 404})
    }
})

// router.get('/all', async(req, res) =>{
//     const users = await User.find()
//     res.json(users)
// })

router.post('/signup', async(req, res) =>{
    const { email, password } = req.body
    const userEmail = await User.findOne({ _email: email })

    if(userEmail){
        res.json({ status: 400 })
    } else{
        const newUSer = new User({ _email: email, _password: password})
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

router.get('/failure', (req, res) =>{
    res.json({ status: 400 })
})

router.get('/success', (req, res) =>{
    res.json({ status: 200 , user: req.user._id})
})

router.put('/update', isAuth, async(req, res) =>{
    const { name, tel, date, country, scholar, degree } = req.body
    const user = await User.findOneAndUpdate({ _id: req.user._id }, {
        _name: name,
        _tel: tel,
        _date: date,
        _country: country,
        _scholar: scholar,
        _degree: degree
    })

    if(user){
        res.json({ status: 200 })
    } else{
        res.json({ status: 400 })
    }
})

router.get('/logout', isAuth, (req, res) =>{
    req.logout()
})


module.exports = router