const { Router } = require('express')
const { isAuth } = require('../auth')

const router = Router()

const Member = require('../models/Member')

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
    const { name, gender, date, country, scholar, institution } = req.body
    const newMember = new Member({
        _leader: req.user._id,
        _name: name,
        _date: date, 
        _gender: gender,
        _country: country, 
        _scholar: scholar,
        _institution: institution,
        _status: 'Sin registrar',
        _robots: []
    })
    await newMember.save()
    res.json({ status: 200 })
})

router.delete('/delete/:id', isAuth, async(req, res) => {
    const member = await Member.findOne({ _id: req.params.id})
    if(member){ 
        if(member._leader == req.user._id){
            await Member.findByIdAndDelete(req.params.id)
            res.json({ status: 200 })
        } else{
            res.json({ status: 401 })
        }
    } else{
        res.json({ status: 404 })
    }
})

// update/:id
// register/:id
// searchBy.../:params

module.exports = router