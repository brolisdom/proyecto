const { Router } = require('express')
const router = Router()

const Member = require('../models/Member')

function isAuth(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.json({ status: 401 });
    }
}

router.get('/data', isAuth, async(req, res) =>{
    const members = await Member.find({ _leader: req.user._id})
    if(members){
        res.json(members)
    } else{
        res.json({ status: 404})
    }
})

// router.get('/all', async(req, res) =>{
//     const members = await Member.find()
//     res.json(members)
// })

router.post('/create', isAuth, async(req, res) =>{
    const leader = req.user._id
    const status = 'Sin registrar'
    const { name, tel, date, country, scholar, degree } = req.body
    const newMember = new Member({
        _leader: leader,
        _name: name,
        _status: status,
        _tel: tel,
        _date: date,
        _country: country,
        _scholar: scholar,
        _degree: degree
    })
    await newMember.save()
    res.json({ status: 200 })
})

module.exports = router