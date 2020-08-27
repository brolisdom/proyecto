const auth = {}

auth.isAuth = (req, res, next) => {
    if(req.isAuthenticated()) next()
    else res.json({ status: 401 })
}

module.exports = auth;