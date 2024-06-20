 require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbconnection = require("./Configure/dbconnection");
const app = express();
const userRoutes = require("./Routes/userRoutes")
const adminRoutes = require("./Routes/adminRoutes")
// const path = require("path");
dbconnection.dbconnect();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const PORT = process.env.PORT;
app.listen(PORT,() => {
    console.log(`server started at port ${PORT}`);

});
app.use("/",userRoutes)
app.use("/admin",adminRoutes)
// app.use("/public", express.static(path.join(__dirname, "public")));