const { Router } = require('express')
const router = Router()

const Robot = require('../models/Robot')

function isAuth(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.json({ status: 401 });
    }
}

router.get('/data', isAuth, async(req, res) =>{
    const robots = await Robot.find({ _leader: req.user._id})
    if(robots){
        res.json(robots)
    } else{
        res.json({ status: 404})
    }
})

// router.get('/all', async(req, res) =>{
//     const robots = await Robot.find()
//     res.json(robots)
// })

router.post('/create', isAuth, async(req, res) =>{
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

module.exports = router