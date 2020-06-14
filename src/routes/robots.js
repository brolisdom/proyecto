const { Router } = require('express')
const { isAuth } = require('../auth')

const router = Router()

const Robot = require('../models/Robot')

router.get('/data', isAuth, async(req, res) => {
    const robots = await Robot.find({ _leader: req.user._id})
    if(robots){
        res.json(robots)
    } else{
        res.json({ status: 404})
    }
})

// router.get('/all', async(req, res) => {
//     const robots = await Robot.find()
//     res.json(robots)
// })

router.post('/create', isAuth, async(req, res) => {
    const leader = req.user._id
    const status = 'Sin registrar'
    const members = []
    const { name, category } = req.body
    const price = 100
    const newRobot = new Robot({ 
        _leader: leader,
        _name: name,
        _category: category,
        _price: price,
        _status: status,
        _members: members
    })
    await newRobot.save()
    res.json({ status: 200 })
})

router.delete('/delete/:id', isAuth, async(req, res) => {
    await Robot.findOneAndUpdate({ _id: req.params._id })
    res.json({ status: 200 })
})

// update/:id
// register/:id
// discount/:id
// searchBy.../:params

module.exports = router