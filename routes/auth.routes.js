const express =  require('express');
const {loginUser, createUser} =require("../controllers/auth.controllers");
const loginLimiter = require("../middlewares/rateLimit.middleware");


const router = express.Router();

router.post("/login", loginLimiter, loginUser);
router.post("/register", createUser);


module.exports = router;