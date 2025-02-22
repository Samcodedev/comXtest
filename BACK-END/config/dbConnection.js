const mongoose = require('mongoose')

// Connecting to the mongoose database
const connectDB = async () =>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(connect.connection.host);
    }
    catch(error){
        console.error('MongoDB Connection Error:', {
            name: error.name,
            message: error.message,
            code: error.code
        });
        process.exit(1)
    }
}

module.exports = connectDB

// mongodb+srv://samcode:<db_password>@comxtest.y0orm.mongodb.net/