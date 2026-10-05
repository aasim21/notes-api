const express =  require('express');
const {loginUser} =require("../controllers/auth.controllers");
const loginLimiter = require("../middlewares/rateLimit.middleware");


const router = express.Router();

router.post("/login", loginLimiter, loginUser);


module.exports = router;