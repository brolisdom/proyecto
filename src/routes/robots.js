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
    const { name, category, captain, m1, m2, m3, idc, id1, id2, id3 } = req.body

    const robot = await Robot.findOne({ _name: name })
    if(robot) res.json({ status: 400 })
    else{
        var members = [], id = []

        if(captain != 'Yo') id.push(idc)

        if(m1 != 'Selecciona una opción'){
            members.push(m1)
            if(m1 != 'Yo') id.push(id1)
        }

        if(m2 != 'Selecciona una opción'){
            members.push(m2)
            if(m2 != 'Yo') id.push(id2)
        }

        if(m3 != 'Selecciona una opción'){
            members.push(m3)
            if(m3 != 'Yo') id.push(id3)
        }

        for(var i = 0; i < id.length; i++){
            member = await Member.findOne({ _id: id[i] })
            if(member) await Member.findByIdAndUpdate( { _id: id[i] }, 
                { _robots: member._robots + 1 })
        }

        var price = 0.00 // provicional

        if(category == "220 Libras") price = 1155.00
        if(category == "120 Libras") price = 1045.00
        if(category == "60 Libras") price = 935.00
        if(category == "30 Libras") price = 825.00
        if(category == "12 Libras") price = 715.00
        if(category == "3 Libras") price = 605.00
        if(category == "1 Libra") price = 539.00
        if(category == "Sumo R.C.") price = 990.00
        if(category == "Minisumo") price = 638.00
        if(category == "Microsumo") price = 638.00
        if(category == "Sumo autonomo") price = 990.00
        if(category == "Seguidor de linea") price = 638.00
        if(category == "Lego sumo") price = 540.00
        if(category == "Lego seguidor de linea") price = 540.00
        if(category == "Carrera de drones") price = 1000.00

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
    const { name, price, category, captain, m1, m2, m3, idc, id1, id2, id3 } = req.body
    const robot = await Robot.findOne({ _id: req.params.id })

    if(!robot) res.json({ status: 404 })
    else{
        if(robot._leader == req.user._id){
            const members = [], id = []
    
            if(captain != 'Yo') id.push(idc)

            if(m1 != 'Selecciona una opción'){
                members.push(m1)
                if(m1 != 'Yo') id.push(id1)
            }

            if(m2 != 'Selecciona una opción'){
                members.push(m2)
                if(m2 != 'Yo') id.push(id2)
            }

            if(m3 != 'Selecciona una opción'){
                members.push(m3)
                if(m3 != 'Yo') id.push(id3)
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
                    _idMember: id,
                    _price: price
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