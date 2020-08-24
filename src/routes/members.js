const { Router } = require('express')
const { isAuth } = require('../auth')

const router = Router()

const Robot = require('../models/Robot')
const Member = require('../models/Member')

// router.get('/all', async(req, res) =>{
//     const members = await Member.find()
//     res.json(members)
// })

router.get('/data', isAuth, async(req, res) =>{
    const members = await Member.find({ _leader: req.user._id})
    if(members) res.json(members)
    else res.json({ status: 404})
})

router.get('/data/:id', isAuth, async(req, res) =>{
    const member = await Member.findOne({ _id: req.params.id})
    if(member){ 
        if(member._leader == req.user._id) res.json(member)
        else res.json({ status: 401 })
    } else res.json({ status: 404 })
})

router.post('/create', isAuth, async(req, res) =>{
    const { name, surname, occupation, tel, gender, date, country, scholarship, institution, provisional } = req.body
    const newMember = new Member({
        _leader: req.user._id,
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
        _status: 'Espectador',
        _robots: 0
    })
    await newMember.save()
    res.json({ status: 200 })
})

router.put('/update/:id', isAuth, async(req, res) => {
    const { name, surname, occupation, tel, date, gender, country, scholarship, institution, provisional } = req.body
    const member = await Member.findOne({ _id: req.params.id })
    if(member){
        if(member._leader == req.user._id){
            const query = { key: String(member._id), value: name + ' ' + surname }
            if(member._robots > 0){
                const robots = await Robot.find({ _leader: member._leader })
                robots.forEach(async(robot) => {
                    if(robot._captain.key == member._id) await Robot.findOneAndUpdate({ _id: robot._id }, { _captain: query })
                    if(robot._member1.key == member._id) await Robot.findOneAndUpdate({ _id: robot._id }, { _member1: query })
                    if(robot._member2.key == member._id) await Robot.findOneAndUpdate({ _id: robot._id }, { _member2: query })
                    if(robot._member3.key == member._id) await Robot.findOneAndUpdate({ _id: robot._id }, { _member3: query })
                })
            }
            await Member.findOneAndUpdate({ _id: req.params.id }, {
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
            })
            res.json({ status: 200 })
        } else res.json({ status: 401 })
    } else res.json({ status: 404 })
})

router.delete('/delete/:id', isAuth, async(req, res) => {
    const member = await Member.findOne({ _id: req.params.id})
    if(member){ 
        if(member._leader == req.user._id){
            await Member.findByIdAndDelete(req.params.id)
            res.json({ status: 200 })
        } else res.json({ status: 401 })
    } else res.json({ status: 404 })
})

module.exports = router