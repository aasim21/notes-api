const User = require('../models/user.model');
const bcrypt = require('bcrypt');


const createUser = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await User.find({email: email});
        if(user.length!==0) return res.status(401).json({message: "User already exist"});
        const hashedpass = await bcrypt.hash(password, 10);

         await User.create({
            name, 
            email,
            password: hashedpass
         });

         res.status(201).json({message:"User added"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Something unexpected happend"});
    }
}

module.exports = {
    createUser
}