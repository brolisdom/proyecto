const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('./models/User')
const LocalStrategy = require('passport-local').Strategy

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
