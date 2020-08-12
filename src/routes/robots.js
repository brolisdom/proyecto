const { Router } = require('express')
const { isAuth } = require('../auth')

const router = Router()

const Robot = require('../models/Robot')
const Member = require('../models/Member')

// router.get('/all', async(req, res) => {
//     const robots = await Robot.find()
//     res.json(robots)
// })

router.get('/data', isAuth, async(req, res) => {
    const robots = await Robot.find({ _leader: req.user._id})
    if(robots) res.json(robots)
    else res.json({ status: 404})
})

router.get('/data/:id', isAuth, async(req, res) =>{
    const robot = await Robot.findOne({ _id: req.params.id})
    if(robot){ 
        if(robot._leader == req.user._id) res.json(robot)
        else res.json({ status: 401 })
    } else res.json({ status: 404 })
})

router.post('/create', isAuth, async(req, res) => {
    const { name, category, captain, m1, m2, m3, m4, m5, idc, id1, id2, id3, id4, id5 } = req.body

    const robot = await Robot.findOne({ _name: name })
    if(robot) res.json({ status: 400 })
    else{
        var members = [], id = []

        if(captain != 'Yo') id.push(idc)

        if(m1 != 'Selecciona una opción'){
            members.push(m1)
            if(id1 != 'Yo') id.push(id1)
        }

        if(m2 != 'Selecciona una opción'){
            members.push(m2)
            if(id2 != 'Yo') id.push(id2)
        }

        if(m3 != 'Selecciona una opción'){
            members.push(m3)
            if(id3 != 'Yo') id.push(id3)
        }

        if(m4 != 'Selecciona una opción'){
            members.push(m4)
            if(id4 != 'Yo') id.push(id4)
        }

        if(m5 != 'Selecciona una opción'){
            members.push(m5)
            if(id5 != 'Yo') id.push(id5)
        }

        // id = new Set(id)

        for(var i = 0; i < id.length; i++){
            member = await Member.findOne({ _id: id[i] })
            if(member) await Member.findByIdAndUpdate( { _id: id[i] }, 
                { _robots: member._robots + 1 })
        }
        const price = 100.01 // provicional
        const newRobot = new Robot({ 
            _leader: req.user._id,
            _captain: captain,
            _name: name,
            _category: category,
            _price: price,
            _status: 'Sin registrar',
            _discount: 'Opcional',
            _prototype: 'Opcional',
            _members: members,
            _idMember: id
        })
        await newRobot.save()
        res.json({ status: 200 })
    }
})

router.put('/update/:id', isAuth, async(req, res) => {
    const { name, category, captain, m1, m2, m3, m4, m5, idc, id1, id2, id3, id4, id5 } = req.body
    const robot = await Robot.findOne({ _id: req.params.id })

    if(!robot) res.json({ status: 404 })
    else{
        if(robot._leader == req.user._id){
            const members = [], id = []
    
            if(captain != 'Yo') id.push(idc)

            if(m1 != 'Selecciona una opción'){
                members.push(m1)
                if(id1 != 'Yo') id.push(id1)
            }

            if(m2 != 'Selecciona una opción'){
                members.push(m2)
                if(id2 != 'Yo') id.push(id2)
            }

            if(m3 != 'Selecciona una opción'){
                members.push(m3)
                if(id3 != 'Yo') id.push(id3)
            }

            if(m4 != 'Selecciona una opción'){
                members.push(m4)
                if(id4 != 'Yo') id.push(id4)
            }

            if(m5 != 'Selecciona una opción'){
                members.push(m5)
                if(id5 != 'Yo') id.push(id5)
            }

            for(var i = 0; i < robot._idMember.length; i++){
                member = await Member.findOne({ _id: robot._idMember[i] })
                if(member) await Member.findByIdAndUpdate( { _id: robot._idMember[i] }, 
                    { _robots: member._robots - 1 })
            }
    
            for(var i = 0; i < id.length; i++){
                member = await Member.findOne({ _id: id[i] })
                if(member) await Member.findByIdAndUpdate( { _id: id[i] }, 
                    { _robots: member._robots + 1 })
            }

            const repeat = await Robot.findOne({ _name: name })

            if(repeat && robot._name != name) {
                res.json({ status: 400 })
            } else{
                await Robot.findOneAndUpdate({ _id: req.params.id }, {
                    _leader: req.user._id,
                    _captain: captain,
                    _name: name,
                    _category: category,
                    _discount: 'Opcional',
                    _prototype: 'Opcional',
                    _members: members,
                    _idMember: id
                })
                res.json({ status: 200 })
            }
        } else res.json({ status: 401 })
    }
})

router.put('/regist/:id', async(req, res) =>{
    const robot = await Robot.findOne({ _id: req.params.id })
    if(robot){
        if(robot._leader == req.user._id){
            await Robot.findByIdAndUpdate(
            { _id: req.params.id }, 
            { _status: 'Pre registrado' })

            for(var i = 0; i < robot._idMember.length; i++){
                await Member.findByIdAndUpdate(
                { _id:  robot._idMember[i]}, 
                { _status: 'Participante' })
            }
            
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

router.put('/substract/:id', isAuth, async(req, res) => {
    const robot = await Robot.findOne({ _id: req.params.id })
    if(robot){ 
        if(robot._leader == req.user._id){
            for(var i = 0; i < robot._idMember.length; i++){
                member = await Member.findOne({ _id: robot._idMember[i] })
                if(member) await Member.findByIdAndUpdate( { _id: robot._idMember[i] }, 
                    { _robots: member._robots - 1 })
            }
            res.json({ status: 200 })

        } else res.json({ status: 401 })
        
    } else res.json({ status: 404 })
})

module.exports = router