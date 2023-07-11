//require express
const express = require('express');

//create instance
const app=express();

//require Dotenv and config
require('dotenv').config();

app.use(express.json());

//connect database
const connectDB =require('./config/connectDB');
connectDB()

// create routes
app.use("/api/contact" , require ("./routes/contact"));

app.use("/api/user" , require ("./routes/user"));

app.use((req,res)=>{ 
    res.send("API is running...")
})



//PORT
const PORT = process.env.PORT || 8258

//create server
app.listen(PORT , error=>{
error ? console.log(error) : 
console.log("server is running on ${PORT}")
})