const express  = require('express');
const { createUser } = require('../controllers/users.controllers');


const router  = express.Router();

//new-user

router.post("/", createUser);


module.exports = router;




