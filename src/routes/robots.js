const { Router } = require('express')
const { isAuth } = require('../auth')

const router = Router()

const Robot = require('../models/Robot')

// router.get('/all', async(req, res) => {
//     const robots = await Robot.find()
//     res.json(robots)
// })

router.get('/data', isAuth, async(req, res) => {
    const robots = await Robot.find({ _leader: req.user._id})
    if(robots){
        res.json(robots)
    } else{
        res.json({ status: 404})
    }
})

router.post('/create', isAuth, async(req, res) => {
    const { name, category, captain, member1, member2, member3, member4, member5 } = req.body
    const members = []
    if(member1) members.push(member1)
    if(member2) members.push(member2)
    if(member3) members.push(member3)
    if(member4) members.push(member4)
    if(member5) members.push(member5)

    const robot = await Robot.findOne({ _name: name })
    if(robot){
        res.json({ status: 400 })
    } else{
        const price = 100.01 // provicional
        const newRobot = new Robot({ 
            _leader: req.user._id,
            _captain: captain,
            _name: name,
            _category: category,
            _price: price,
            _status: 'Sin registrar',
            _discount: '',
            _prototype: '',
            _members: members
        })
        await newRobot.save()
        res.json({ status: 200 })
    }
})

router.put('/regist/:id', async(req, res) => {
    const robot = await Robot.findOne({ _id: req.params.id })
    if(robot){
        if(robot._leader == req.user._id){
            await Robot.findByIdAndUpdate(
            { _id: req.params.id }, 
            { _status: 'Pre-registrado' })
            res.json({ status: 200 })
        } else res.json({ status: 401 })
    } else res.json({ status: 404 })
})

router.delete('/delete/:id', isAuth, async(req, res) => {
    const robot = await Robot.findOne({ _id: req.params.id })
    if(robot){ 
        if(robot._leader == req.user._id){
            await Robot.findByIdAndDelete(req.params.id)
            res.json({ status: 200 })
        } else res.json({ status: 401 })
    } else res.json({ status: 404 })
})

module.exports = router