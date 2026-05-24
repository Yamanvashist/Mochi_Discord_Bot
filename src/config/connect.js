import mongoose from "mongoose";
import "dotenv/config"

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo Db connected!")
    }catch(err){
        console.log("Mongo db Error",err)
    }
}

export default connect;