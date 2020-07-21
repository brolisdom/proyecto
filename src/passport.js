const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('./models/User')
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth20')
const LocalStrategy = require('passport-local').Strategy

passport.use(new GoogleStrategy({
    callbackURL: '/api/users/auth/google/callback', //cambiar
    clientID: '1056600364523-hcg53enb9d6barup1jdvak8dgeqog5hq.apps.googleusercontent.com',
    clientSecret: 'PIS4uez-oapEMu9reFK5ogKd',
}, (accessToken, refreshToken, profile, done) => {
    // console.log(profile._json)
    User.findOne({ _googleID: profile._json.sub }).then((currentUser) => {
        if(currentUser){
            return done(null, currentUser)
        } else{
            User.findOne({ _email: profile._json.email }).then((currentEmail) => {
                if(currentEmail){
                    return done(null, false)
                } else{ new User({
                        _email: profile._json.email,
                        _status: 'Espectador',
                        _password: '', 
                        _name: '',
                        _tel: '',
                        _date: '',
                        _gender: '',
                        _country: '',
                        _scholar: '',
                        _institution: '',
                        _school: '',
                        _team: '',
                        _googleID: profile._json.sub
                    }).save().then((newUser) => { return done(null, newUser) })
                }
            })
        }
    })
}))

passport.use(new FacebookStrategy({
    callbackURL: '/api/users/auth/facebook/callback', //cambiar
    clientID: '204742010947879',
    clientSecret: '334a47e0ba3dfea4f47c749ae8932031',
    profileFields: ['id', 'emails']
}, (accessToken, refreshToken, profile, done) => {
    // console.log(profile._json)
    User.findOne({ _facebookID: profile._json.id }).then((currentUser) => {
        if(currentUser){
            return done(null, currentUser)
        } else{
            User.findOne({ _email: profile._json.email}).then((currentEmail) => {
                if(currentEmail){
                    return done(null, false)
                } else{
                    new User({
                        _email: profile._json.email,
                        _status: 'Espectador',
                        _password: '', 
                        _name: '',
                        _tel: '',
                        _date: '',
                        _gender: '',
                        _country: '',
                        _scholar: '',
                        _institution: '',
                        _school: '',
                        _team: '',
                        _facebookID: profile._json.id,
                    }).save().then((newUser) => { return done(null, newUser) })
                }
            })
        }
    })
}))

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) =>{
    const user = await User.findOne({ _email: email })
    if(!user){
        return done(null, false)
    } else{
        const match = await bcrypt.compare(password, user._password)
        if(match){
            return done(null, user)
        } else{
            return done(null, false)
        }
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
        done(err, user)
    })
})
