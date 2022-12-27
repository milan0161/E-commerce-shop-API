const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
    const authToken = req.headers.authorization.split(' ')[1]
    let user;
    let isAuthorized;
        if(!authToken){
            isAuthorized = false
            return next()
        }
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET)
        const userRole = decodedToken.role
        
        if(userRole !== 'admin'){
            isAuthorized = false
            return next()
        }
        user = decodedToken
        isAuthorized = true;
        next()
}


module.exports = isAuth;