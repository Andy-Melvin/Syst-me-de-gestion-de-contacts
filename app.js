require('dotenv').config({path:'./config/config.env'});
const express=require('express');
const mongoose = require('mongoose');
const morgan=require('morgan');



const app =express();


const connectDB = require("./config/db");

const auth =require("./middlewares/auth")

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(require('cors')());

connectDB();
//routes
app.get('/protected', auth, (req,res)=>{
    return res.status(200).json({...req.user._doc});
}); 
app.use('/api', require('./routes/auth'));


//Server Config
const PORT=process.env.PORT || 4500;
app.listen(PORT, () =>{
    try{
        console.log(`Server is listening on ${PORT}`)
        // await connectDB()
    }catch(err){
        console.log(err);
    }
});
  