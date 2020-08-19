const { Router } = require('express')
const router = Router()

const User = require('../models/User')
const Robot = require('../models/Robot')
const Member = require('../models/Member')

router.get('/check', async(req, res) =>{
    const user = await User.findOne({ _id: req.user.id })
    if(user){
        res.json({ status: 200 })
    } else{
        res.json({ status: 401 })
    }
})

router.get('/all/:value', async(req, res) =>{
    const { value } = req.params
    if(value == '1'){ 
        res.json(await User.find())
    } else if(value == '2'){
        res.json(await Member.find())
    } else if(value == '3'){
        res.json(await Robot.find())
    } else res.json({ status: 400 })
})

router.get('/user/:id', async(req, res) =>{
    res.json(await User.findOne({ _id: req.params.id }))
})

router.get('/user-member/:id', async(req, res) =>{
    res.json(await Member.find({ _leader: req.params.id}))
})

router.get('/user-robot/:id', async(req, res) => {
    res.json(await Robot.find({ _leader: req.params.id}))
})

router.get('/member/:id', async(req, res) => {
    res.json(await Member.findOne({ _id: req.params.id}))
})

router.put('/member-update/:id', async(req, res) => {
    const { name, surname, occupation, tel, date, gender, country, scholarship, institution, provisional } = req.body
    const member = await Member.findOne({ _id: req.params.id })
    if(member){
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
})

router.get('/robot/:id', async(req, res) => {
    res.json(await Robot.findOne({ _id: req.params.id}))
})

router.put('/robot-update/:id', async(req, res) => {
    const { name, category, price, captain, m1, m2, m3, idc, id1, id2, id3 } = req.body
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

module.exports = router