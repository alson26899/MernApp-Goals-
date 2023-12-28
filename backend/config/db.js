const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI) ;
        console.log(`Db is connected successfully ${connection.connection.host}`.cyan.underline)
    }
    catch(error){
        console.log(error)
    }
}

module.exports = connectDB;