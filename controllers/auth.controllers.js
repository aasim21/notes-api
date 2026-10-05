const User = require("../models/user.model");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");

//Signup or create a new User
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


//Logging in an existing User
const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(401).json({message:"Invalid email or password"});

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) return  res.status(401).json({message:"Invalid email or password"});

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.json({
            message: "Login successful",
            token}
        );
    
    }
    catch(error){
        console.error("Login failed:", error.message);
        res.status(500).json({
            message: "Something unexpected happened"
        });
    }
}

module.exports = {
    loginUser,
    createUser
}