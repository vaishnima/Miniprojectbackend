require("dotenv").config();  
const mongoose = require("mongoose"); 


module.exports = {
    dbconnect: async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").then(() => {
            console.log("MongoDB connected successfully");
        });
        
     }catch (err){
        console.log(err);
     }
   }
}