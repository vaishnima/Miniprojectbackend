const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const createToken = (userId) => {
    const token = jwt.sign({ userId }, "JWT", { expiresIn: "24h" });
    return token;
}
module.exports.signup=async(req, res, next)=>{
    console.log(req.body,"%%%%%%%%%%%%%%%%%%%%%%%")
    const{email, password, username} = req.body;
    try{
     const emailExist=await userModel.findOne({email:email});
     if(emailExist){
        return res.json({message:'Email already exists',
        status: false,
    });
     }
     const newUser = new userModel({
        username: username,
        email: email,
        password: password,
     });

     const userDetails = await newUser.save();
     const token = createToken(userModel._id);
     return res.json({
        message:"Account created successfully",
        status: 'true',
        token,
     });
    }catch (err) {
        console.log(err);
        return res.json({
            message:"Internal server in sign up",
            status:false,
        });
    }
};


module.exports.login=async(req,res,next) =>{
console.log(req.body,"%%%%%%%%%%%%%%%%%%%%%%%")
const{email,password}=req.body;
    try{
        const emailExist=await userModel.findOne({ email: email });
        if (emailExist){
            return res.json({message:"Email already exists",status:false});
        }
        const newUser=new userModel({
            // username:username,
            email:email,
            password:password,
        })
        const userDetails= await newUser.save();
        const token= createToken(userDetails._id);
        return res,json({
            message:"Account created successfully",
            status:true,
            token,
        });

    } catch(error){
        console.log(error);
        return res.json({message:"",status:false})
        
    }
};

