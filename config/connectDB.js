const mongoose=require('mongoose');
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
       console.log("database connected")
    } 
    catch (error){
    console.log("database is not connected")}
}
module.exports=connectDB;