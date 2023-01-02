const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
    const authToken = req.headers.authorization.split(' ')[1]
    let user;
    let isAuthorized;
        if(!authToken){
            const error = new Error('Not authenticated')
            error.statusCode = 401;
            throw error
        }
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET)
        const userRole = decodedToken.role
        
        if(userRole !== 'admin'){
            const error = new Error('Not authorized')
            error.statusCode = 401;
            throw error
        }
        user = decodedToken;
        isAuthorized = true;
        next()
}


module.exports = isAuth;