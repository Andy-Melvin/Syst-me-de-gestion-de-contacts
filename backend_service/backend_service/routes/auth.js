const router =require('express').Router();
const User=require('../models/user');
router.post('/login');
const becrypt=require('bcrypt');
const jwt =require('jsonwebtoken');

router.post('register',async (req,res) =>{
    const {name, email, password}=req.body;

    //Checking all the missing Fields
    if (!name || !email || !password)
        return res
            .status(400)
            .json({error: `Veuillez remplir tous les champs obligatoires`});
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //Try to Modify it and use Joie later
    //We validate the name
    if(name.length >25)return res.status(400).json({error:"Le nom doit comporter au moins 6 caractères"})

    //Checking email
        if(emailReg.test(email))
            return res
                .status(400)
                .json({error: "Veuillez saisir une adresse e-mail valide    "});
    //Validating a password
    if (password.length < 6) return res
    .status(400)
    .json({error: "Le mot de passe doit comporter au moins 6 caractères"})
            try{
            const checkIfuserExist=await User.findOne({email});
            if(!checkIfuserExist) return res.status(400).json({error: `Un utilisateur avec e-mail [${checkIfuserExist.email}] existe déjà`})
            const hashedPassword = await becrypt.hash(password, 10);
            const newUser= new User({name,email,password:hashedPassword });

            //Save the users
            const result =await newUser.save();

            result._doc.password= undefined;

            return res.status(201).json({...result._doc});
            }catch (err){
                console.log(err);
                return res.status(500).json({error: error.message});
            }
});

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    

    if(!email || !password) return res.status(400).json({error : "Veuillez remplir tous les champs OBLIGATOIRES!"})
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailReg.test(email))
    return res
        .status(400)
        .json({error: "Veuillez saisir une adresse e-mail valide"});
    try{   
        const doesUserExist=  await User.findOne9({email});
       if( !doesUserExist) return res.status(400).json({error: "Email ou mot de passe invalide"})  
    
    //If there were any user present
    const doesPasswordMatch= await becrypt.compare(password.doesUserExist.password);
    if(!doesPasswordMatch) return res.status(400)({error: "Email ou mot de passe invalide"})
    

    const payload ={_id: doesUserExist._id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    const user = {...doesUserExist._doc, password: undefined}
    return res.status(200).json({token, user})
    }catch(err){
        console.log(err);
        return res.status(500).json({error: error.message});
    }
})

module.exports=router;