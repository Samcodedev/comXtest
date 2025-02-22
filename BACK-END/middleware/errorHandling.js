const constant = require('../constant.json')
 
// Handling all errors by displaying it in a json format
const handleError = (error, req, res, next) =>{
    const statusCode = res.statusCode? res.statusCode : 500

    constant.map((item) =>{
        let statusArray = Object.values(item)
        let index = statusArray.indexOf((Object.values(item)).filter(element => element === statusCode)[0])
        let errorTitle = Object.keys(item)[index]

        res.json({
            title: errorTitle,
            message: error.message,
            status: statusCode,
            location: error.stack
        })
        return
    })
}

module.exports = handleError