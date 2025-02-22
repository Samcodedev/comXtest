const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

// Token validation for private routes
const validateToken = asyncHandler( async (req, res, next) =>{
    let token;
    const Header = req.headers.Authorization || req.headers.authorization
    if(Header && Header.startsWith('Bearer')){
        token = Header.split(' ')[1]

        // decoding the datas stored in the token and sending it as REQ to be used by private routes
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
            if(err){
                res.status(401)
                throw new Error('User is not authorize token exp')
            }
            req.user = decoded.user
            next()
        })
    }
    if(!token){
        res.status(401)
        throw new Error('User is not authorized or token is missing')
    }
})

module.exports = validateToken