const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
    name: {
        type:String,
        required:[ true,"Le nom est requis."]
    },
    email:{
        type:String,
        required:[ true,"Email est requis."]
    },
    password:{
        type:String,
        required:[ true,"Le mot de passe est requis."]
    },
});

const User=new mongoose.model("User", UserSchema);

module.exports=User;