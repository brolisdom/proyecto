const { Router } = require('express')
const { isAuth } = require('../auth')

const router = Router()
const User = require('../models/User')
const Robot = require('../models/Robot')
const Member = require('../models/Member')

router.get('/check', isAuth, async(req, res) =>{ // provisional para arreglar bug
    const user = await User.findOne({ _id: req.user._id })
    if(user._status == 'Admin') res.json({ status: 200 })
    else res.json({ status: 401 })
})

router.get('/disqualify/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        const query = await Robot.findByIdAndUpdate(req.params.id, { _status: 'Descalificado' })
        if(query) res.json({ status: 200 })
        else res.json({ status: 400 })
    } else res.json({ status: 401 })
})

router.get('/regist/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        const query = await Robot.findByIdAndUpdate(req.params.id, { _status: 'Registrado' })
        if(query) res.json({ status: 200 })
        else res.json({ status: 400 })
    } else res.json({ status: 401 })
})

router.get('/denied/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        const query = await User.findByIdAndUpdate(req.params.id, { _status: 'Denied' })
        if(query) res.json({ status: 200 })
        else res.json({ status: 400 })
    } else res.json({ status: 401 })
})

router.get('/descend/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        const query = await User.findByIdAndUpdate(req.params.id, { _status: 'Normal' })
        if(query) res.json({ status: 200 })
        else res.json({ status: 400 })
    } else res.json({ status: 401 })
})

router.get('/ascend/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        const query = await User.findByIdAndUpdate(req.params.id, { _status: 'Admin' })
        if(query) res.json({ status: 200 })
        else res.json({ status: 400 })
    } else res.json({ status: 401 })
})

router.get('/check/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        const query = await User.findByIdAndUpdate(req.params.id, { _verfied: true })
        if(query) res.json({ status: 200 })
        else res.json({ status: 400 })
    } else res.json({ status: 401 })
})

router.get('/all/:value', async(req, res) =>{
    if(req.user._status == 'Admin'){
        const { value } = req.params
        if(value == '1'){ 
            res.json(await User.find())
        } else if(value == '2'){
            res.json(await Member.find())
        } else if(value == '3'){
            res.json(await Robot.find())
        } else res.json({ status: 400 })
    } else res.json({ status: 401 })
})

router.get('/user/:id', async(req, res) =>{
    if(req.user._status == 'Admin'){
        res.json(await User.findOne({ _id: req.params.id }))
    } else res.json({ status: 401 })
})

router.get('/user-member/:id', async(req, res) =>{
    if(req.user._status == 'Admin'){
        res.json(await Member.find({ _leader: req.params.id}))
    } else res.json({ status: 401 })
})

router.get('/user-robot/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        res.json(await Robot.find({ _leader: req.params.id}))
    } else res.json({ status: 401 })
})

router.get('/member/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        res.json(await Member.findOne({ _id: req.params.id}))
    } else res.json({ status: 401 })
})

router.put('/member-update/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        const { name, surname, occupation, tel, date, gender, country, scholarship, institution, provisional } = req.body
        const member = await Member.findOne({ _id: req.params.id })
        if(member){
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
        } else res.json({ status: 404 })
    } else res.json({ status: 401 })
})

router.get('/robot/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        res.json(await Robot.findOne({ _id: req.params.id}))
    } else res.json({ status: 401 })
})

router.put('/robot-update/:id', async(req, res) => {
    if(req.user._status == 'Admin'){
        const { name, category, price, captain, m1, m2, m3, idc, id1, id2, id3 } = req.body
        const robot = await Robot.findOne({ _id: req.params.id })
    
        if(robot){
            const repeat = await Robot.findOne({ _name: name })
            if(!repeat || robot._name == name){
                if(robot._captain.key != '') await Member.findOneAndUpdate({_id : robot._captain.key}, {$inc : {_robots : -1}})
                if(robot._member1.key != '') await Member.findOneAndUpdate({_id : robot._member1.key}, {$inc : {_robots : -1}})
                if(robot._member2.key != '') await Member.findOneAndUpdate({_id : robot._member2.key}, {$inc : {_robots : -1}})
                if(robot._member3.key != '') await Member.findOneAndUpdate({_id : robot._member3.key}, {$inc : {_robots : -1}})
    
                if(idc != '') await Member.findOneAndUpdate({_id : idc}, {$inc : {_robots : 1}})
                if(id1 != '') await Member.findOneAndUpdate({_id : id1}, {$inc : {_robots : 1}})
                if(id2 != '') await Member.findOneAndUpdate({_id : id2}, {$inc : {_robots : 1}})
                if(id3 != '') await Member.findOneAndUpdate({_id : id3}, {$inc : {_robots : 1}})
    
                await Robot.findOneAndUpdate({ _id: req.params.id }, {
                    _name: name,
                    _price: price,
                    _category: category,
                    _prototype: prototype,
                    _captain: { key: idc, value: captain },
                    _member1: { key: id1, value: m1 },
                    _member2: { key: id2, value: m2 },
                    _member3: { key: id3, value: m3 }
                })
                res.json({ status: 200 })
            } else res.json({ status: 403 })
        } else res.json({ status: 404 })
    } else res.json({ status: 401 })
})

module.exports = router

// router.get('/:filtro/:search', async(req, res) =>{
//     const { filtro, search } = req.params
//     if(filtro == '1'){
//             const users = await User.find({ _name: search})
//             if(users) res.json(users)
//             else res.json({ status: 404 })
//     }
//     if(filtro == '2'){
//             const users = await User.find({ _name: search})
//             if(users) res.json(users)
//             else res.json({ status: 404 })
//     }
//     if(filtro == '3'){
//             const users = await User.find({ _email: search})
//             if(users) res.json(users)
//             else res.json({ status: 404 })
//     }
//     if(filtro == '4'){
//             const robots = await Robot.find({ _name: search})
//             if(robots) res.json(robots)
//             else res.json({ status: 404 })
//     }
//     if(filtro == '5'){
//             const members = await Member.find({ _name: search})
//             if(members) res.json(members)
//             else res.json({ status: 404 })
//     }
// })