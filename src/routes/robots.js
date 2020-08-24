const { Router } = require('express')
const { unlink } = require('fs-extra')
const { isAuth } = require('../auth')

const path = require('path')
const router = Router()

const Robot = require('../models/Robot')
const Member = require('../models/Member')

// function substract(array, val){
//     var res = []
//     array.forEach(element => { if(element != val) res.push(element)})
//     return res
// }

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
    const { name, price, category, captain, m1, m2, m3, idc, id1, id2, id3 } = req.body
    const robot = await Robot.findOne({ _name: name })

    if(!robot){
        var prototype
        if(req.file) prototype = '/prototypes/' + req.file.filename
        else prototype = ''
        const newRobot = new Robot({ 
            _leader: req.user._id,
            _name: name,
            _category: category,
            _price: price,
            _status: 'Sin registrar',
            _prototype: prototype,
            _payment: '',
            _captain: { key: idc, value: captain },
            _member1: { key: id1, value: m1 },
            _member2: { key: id2, value: m2 },
            _member3: { key: id3, value: m3 }
            // _idMember: id
        })
        await newRobot.save()
        if(idc != '') await Member.findOneAndUpdate({_id : idc}, {$inc : {_robots : 1}})
        if(id1 != '') await Member.findOneAndUpdate({_id : id1}, {$inc : {_robots : 1}})
        if(id2 != '') await Member.findOneAndUpdate({_id : id2}, {$inc : {_robots : 1}})
        if(id3 != '') await Member.findOneAndUpdate({_id : id3}, {$inc : {_robots : 1}})
        res.json({ status: 200 })
    } else res.json({ status: 403 })
})

router.put('/update/:id', isAuth, async(req, res) => {
    const { name, price, category, captain, m1, m2, m3, idc, id1, id2, id3 } = req.body
    const robot = await Robot.findOne({ _id: req.params.id })
    
    if(!robot) res.json({ status: 404 })
    else{
        var prototype
        if(req.file && robot._prototype == ''){
            prototype = '/prototypes/' + req.file.filename
        } else if(req.file && robot._prototype != ''){
            unlink(path.resolve('./public'+ robot._prototype))
            prototype = '/prototypes/' + req.file.filename
        } else prototype = ''

        if(robot._leader == req.user._id){
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
            if(robot._captain.key != '') await Member.findByIdAndUpdate({ _id: robot._captain.key }, { _status: 'Participante' })
            if(robot._member1.key != '') await Member.findByIdAndUpdate({ _id: robot._member1.key }, { _status: 'Participante' })
            if(robot._member2.key != '') await Member.findByIdAndUpdate({ _id: robot._member2.key }, { _status: 'Participante' })
            if(robot._member3.key != '') await Member.findByIdAndUpdate({ _id: robot._member3.key }, { _status: 'Participante' })
            res.json({ status: 200 })
        } else res.json({ status: 401 })
    } else res.json({ status: 404 })
})

router.delete('/delete/:id', isAuth, async(req, res) => {
    const robot = await Robot.findOne({ _id: req.params.id })
    if(robot){ 
        if(robot._leader == req.user._id){
            unlink(path.resolve('./public'+ robot._prototype))
            if(robot._captain.key != '') await Member.findOneAndUpdate({_id : robot._captain.key}, {$inc : {_robots : -1}})
            if(robot._member1.key != '') await Member.findOneAndUpdate({_id : robot._member1.key}, {$inc : {_robots : -1}})
            if(robot._member2.key != '') await Member.findOneAndUpdate({_id : robot._member2.key}, {$inc : {_robots : -1}})
            if(robot._member3.key != '') await Member.findOneAndUpdate({_id : robot._member3.key}, {$inc : {_robots : -1}})

            await Robot.findByIdAndDelete(req.params.id)
            res.json({ status: 200 })
        } else res.json({ status: 401 })
    } else res.json({ status: 404 })
})

module.exports = router

// router.post('/create', isAuth, async(req, res) => {
//     const { name, price, category, captain, m1, m2, m3, idc, id1, id2, id3 } = req.body
//     var prototype
//     if(req.file) prototype = '/prototypes/' + req.file.filename
//     else prototype = ''

//     const robot = await Robot.findOne({ _name: name })
//     if(robot) res.json({ status: 400 })
//     else{
//         var members = [], id = []
//         if(captain != 'Yo') id.push(idc)
//         if(m1 != 'Selecciona una opción'){
//             members.push(m1)
//             if(m1 != 'Yo') id.push(id1)
//         }
//         if(m2 != 'Selecciona una opción'){
//             members.push(m2)
//             if(m2 != 'Yo') id.push(id2)
//         }
//         if(m3 != 'Selecciona una opción'){
//             members.push(m3)
//             if(m3 != 'Yo') id.push(id3)
//         }
//         for(var i = 0; i < id.length; i++){
//             member = await Member.findOne({ _id: id[i] })
//             if(member) await Member.findByIdAndUpdate( { _id: id[i] }, 
//                 { _robots: member._robots + 1 })
//         }

//         const newRobot = new Robot({ 
//             _leader: req.user._id,
//             _captain: captain,
//             _name: name,
//             _category: category,
//             _price: price,
//             _status: 'Sin registrar',
//             _payment: '',
//             _members: members,
//             _prototype: prototype,
//             _idMember: id
//         })
//         await newRobot.save()
//         res.json({ status: 200 })
//     }
// })

// router.put('/update/:id', isAuth, async(req, res) => {
//     const { name, price, category, captain, m1, m2, m3, idc, id1, id2, id3 } = req.body

//     const robot = await Robot.findOne({ _id: req.params.id })
//     if(!robot) res.json({ status: 404 })
//     else{
//         var prototype
//         if(req.file && robot._prototype == ''){
//             prototype = '/prototypes/' + req.file.filename
//         } else if(req.file && robot._prototype != ''){
//             unlink(path.resolve('./public'+ robot._prototype))
//             prototype = '/prototypes/' + req.file.filename
//         } else prototype = ''

//         if(robot._leader == req.user._id){
//             const members = [], id = []
    
//             if(captain != 'Yo') id.push(idc)
//             if(m1 != 'Selecciona una opción'){
//                 members.push(m1)
//                 if(m1 != 'Yo') id.push(id1)
//             }
//             if(m2 != 'Selecciona una opción'){
//                 members.push(m2)
//                 if(m2 != 'Yo') id.push(id2)
//             }
//             if(m3 != 'Selecciona una opción'){
//                 members.push(m3)
//                 if(m3 != 'Yo') id.push(id3)
//             }

//             for(var i = 0; i < robot._idMember.length; i++){
//                 member = await Member.findOne({ _id: robot._idMember[i] })
//                 if(member) await Member.findByIdAndUpdate( { _id: robot._idMember[i] }, 
//                     { _robots: member._robots - 1 })
//             }
    
//             for(var i = 0; i < id.length; i++){
//                 member = await Member.findOne({ _id: id[i] })
//                 if(member) await Member.findByIdAndUpdate( { _id: id[i] }, 
//                     { _robots: member._robots + 1 })
//             }

//             const repeat = await Robot.findOne({ _name: name })
//             if(repeat && robot._name != name) {
//                 res.json({ status: 400 })
//             } else{
//                 await Robot.findOneAndUpdate({ _id: req.params.id }, {
//                     _leader: req.user._id,
//                     _captain: captain,
//                     _name: name,
//                     _category: category,
//                     // _payment: '',
//                     _prototype: prototype,
//                     _members: members,
//                     _idMember: id,
//                     _price: price
//                 })
//                 res.json({ status: 200 })
//             }
//         } else res.json({ status: 401 })
//     }
// })

// router.put('/regist/:id', async(req, res) =>{
//     const robot = await Robot.findOne({ _id: req.params.id })
//     if(robot){
//         if(robot._leader == req.user._id){
//             await Robot.findByIdAndUpdate(
//             { _id: req.params.id }, 
//             { _status: 'Pre registrado' })

//             for(var i = 0; i < robot._idMember.length; i++){
//                 await Member.findByIdAndUpdate(
//                 { _id:  robot._idMember[i]}, 
//                 { _status: 'Participante' })
//             }
            
//             res.json({ status: 200 })
//         } else res.json({ status: 401 })
//     } else res.json({ status: 404 })
// })

// router.delete('/delete/:id', isAuth, async(req, res) => {
//     const robot = await Robot.findOne({ _id: req.params.id })
//     if(robot){ 
//         if(robot._leader == req.user._id){
//             unlink(path.resolve('./public'+ robot._prototype))
//             await Robot.findByIdAndDelete(req.params.id)
//             res.json({ status: 200 })
//         } else res.json({ status: 401 })
//     } else res.json({ status: 404 })
// })

// router.put('/substract/:id', isAuth, async(req, res) => {
//     const robot = await Robot.findOne({ _id: req.params.id })
//     if(robot){ 
//         if(robot._leader == req.user._id){
//             for(var i = 0; i < robot._idMember.length; i++){
//                 member = await Member.findOne({ _id: robot._idMember[i] })
//                 if(member) await Member.findByIdAndUpdate( { _id: robot._idMember[i] }, 
//                     { _robots: member._robots - 1 })
//             }
//             res.json({ status: 200 })
//         } else res.json({ status: 401 })
//     } else res.json({ status: 404 })
// })