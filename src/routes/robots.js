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
    const { name, category } = req.body
    const price = 100 // hacer validacion
    const newRobot = new Robot({ 
        _leader: req.user._id,
        _name: name,
        _category: category,
        _price: price,
        _status: 'Sin registrar',
        _members: []
    })
    await newRobot.save()
    res.json({ status: 200 })
})

router.delete('/delete/:id', isAuth, async(req, res) => {
    const robot = await Robot.findOne({ _id: req.params.id})
    if(robot){ 
        if(robot._leader == req.user._id){
            await Robot.findByIdAndDelete(req.params.id)
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
// discount/:id
// searchBy.../:params

module.exports = router