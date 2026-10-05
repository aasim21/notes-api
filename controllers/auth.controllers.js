const User = require("../models/user.model");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    loginUser
}