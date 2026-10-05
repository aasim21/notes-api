require("dotenv").config();
require("./config/env.js");
const connectDB = require("./db.js");
const app = require('./app');


const startServer = async () => {
    
    await connectDB();

    app.listen(3000, () => {
        console.log("Server running on port: 3000");
    });
    
}

startServer();