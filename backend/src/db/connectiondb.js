const  mongoose = require("mongoose");

const connectDb = async (DATABASE_URL_LOCAL, DATABASE_URL_ATLAS)=>{
    try {
         const DB_OPTION = {
            dbName:"todolist"
        }
       let DATABASE_URL = DATABASE_URL_LOCAL;
       if(process.env.NODE_ENV === "production"){
        DATABASE_URL = DATABASE_URL_ATLAS
       }

       await mongoose.connect(DATABASE_URL, DB_OPTION )
       console.log("connected successfully")

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;