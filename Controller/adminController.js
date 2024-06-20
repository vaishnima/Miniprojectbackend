const adminModel = require("../Model/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");

const productModel = require("../Model/productModel");
const userModel = require("../Model/userModel");
// const upload = require("../Middleware/multer");
// const { validationResult } = require("express-validator");
// const orderModel = require("../Model/orderModel");


const maxAge = 3 * 24 * 60 * 60;

const createToken = (adminId) => {
    const token = jwt.sign({ adminId }, "JWT", { expiresIn: maxAge });
    return token;
}
module.exports.login=async (req,res,next) => {
    console.log(req.body,"%%%%%%%%%%%%%%%%%%%%%%%");
    const { email, password } = req.body;
        
        try {
            const admin = await adminModel.findOne({ email });
            console.log("111111111111111111%%%%%%%%%%%%" + admin);
            if(admin){
                console.log("2222222222222222%%%%%%%%%%%%" + admin);
                const passwordMatches = await bcrypt.compare(password,admin.password);

                if(passwordMatches) {
                    console.log("CREATED TOKEN @@@@@@@@!!!!!!!!!");
                    const token = createToken(admin._id);
                    return res.status(200).json({
                        admin: admin,
                        message:"Admin login successful",
                        created: true,
                        token,
                    });
                }
                else{
                    return res.status(401).json({
                        message:"incorrect password",
                        created: false,
                    });
                }
            } else {
                return res.status(404).json({
                    message:"Account not found",
                    created:false,
                });
        }
    
        } catch(error){
            console.log(error);
            return res.status(500).json({
                message:"Internal server error during login",
                created:false,
            });
            
        }
    };

    
    // module.exports.AddProducts = async (req, res) => {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //       return res.status(400).json({ errors: errors.array() });
    //     }
      
    //     try {
    //       // Create new Product instance
    //       const {
    //         name,
    //         brand,
            
    //         price,
            
            
    //         // dateAdded,
    //         category,
            
    //       } = req.body;
    //       const image = req.file ? req.file.filename : null;
      
    //       // Create a new product instance using the Product model
    //       const product = new productModel({
    //         name,
    //         brand,
            
    //         price,
            
          
    //         // dateAdded: new Date(dateAdded),
    //         category,
    //         image,
    //       });
      
    //       // Save the product to the database
    //       await product.save();
      
    //       res.status(201).json(product); // Return the created product
    //     } catch (error) {
    //       console.error(` Error Here : ${error}`);
    //       res.status(500).send("Server Error");
    //     }
    //   };
    
    module.exports.userData = async (req, res, next) => {
      try{
        const data = await userModel.find();
    
        res.json({
          message: "User list fetched",
          status: true,
          UserData: data,
        });
      } catch (error) {
        console.log(error);
        res.json({
          message: "Internal server error in userlist",
          status: false,
        });
      }
    };
    
    
    
    

    
    exports.removeUser = async (req, res) => {
      try {
        const { userId } = req.params;
        await userModel.findByIdAndDelete(userId);
        res.status(200).json({ message: "User removed successfully", status: true });
      } catch (error) {
        console.error("Error removing user:", error);
        res.status(500).json({ message: "Internal server error", status: false });
      }
    };
    module.exports.AddProduct =async (req,res)=>{
      try {
          const { name, description, price, category, image}=req.body;
             
          const products=new productModel({name:name, description:description, price:price ,category:category, image: image});
          await products.save();
          res.json({message:"product added successfully"});
      } catch (error) {
          res.status(400).json({error:error.message});
          
      }
    };
    
    
    //List Product
    
    module.exports.ProductList=async (req,res,next)=>{
    
      try{
        const data=await productModel.find();
    
        res.status(200).json({
          message: "Products fetched",
          status: true,
          productList: data,
        });
      }
      catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal server error during product fetching",
          status: false,
        });
      }
    }

    module.exports.editProduct = async (req, res) => {
      try{
        const product = await productModel.findById(req.params.id);
        if(!product){
          return res.status(404).json({ message: "Product not found "});
        }
    
        Object.assign(product, req.body);
    
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
      } catch(error) {
        res.status(400).json({ message: error.message});
      }
    };
    
    module.exports.getProductById = async (req, res) => {
      try {
        const productId = req.params.id;
    
        const product = await productModel.findById(productId);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
      }
    };
    
    
    //DELETE 
    
    
    
    module.exports.deleteProduct = async (req, res) => {
      try {
        const { productId } = req.params;
        await productModel.findByIdAndDelete(productId);
        res.status(200).json({ message: "Product removed successfully", status: true });
      } catch (error) {
        console.error("Error removing user:", error);
        res.status(500).json({ message: "Internal server error", status: false });
      }
    };
    

    

    // module.exports.userData = async (req, res, next) => {
    //     try{
    //       const data = await userModel.find();
      
    //       res.status(200).json({
    //         message: "User data fetched",
    //         status: true,
    //         UserData: data,
    //       });
    //     } catch (error) {
    //       console.log(error);
    //       res.status(500).json({
    //         message: "Internal server error during product fetching",
    //         status: false,
    //       });
    //     }
    //   };
    //   module.exports.viewProducts = async (req, res, next) => {
    //     try {
    //       const data = await productModel.find();
      
    //       res.status(200).json({
    //         message: "Products fetched",
    //         status: true,
    //         ViewProducts: data,
    //       });
    //     } catch (error) {
    //       console.log(error);
    //       res.status(500).json({
    //         message: "Internal server error during product fetching",
    //         status: false,
    //       });
    //     }
    //   };
      
    //   module.exports.getProductById = async (req, res, next) => {
    //     try {
    //       const product = await productModel.findById(req.params._id);
      
    //       if (!product) {
    //         return res.status(404).json({ message: "Product not found" });
    //       }
      
    //       res.status(200).json(product);
    //     } catch (error) {
    //       console.log(error);
    //       res.status(500).json({ message: "Failed to fetch product", error });
    //     }
    //   };
      
    //   module.exports.updateProduct = async (req, res, next) => {
    //     try {
    //       const updatedProduct = await productModel.findByIdAndUpdate(
    //         req.params._id,
    //         req.body,
    //         { new: true }
    //       );
    //       if (!updatedProduct) {
    //         return res.status(404).json({ message: "Product not found" });
    //       }
    //       return res.status(200).json(updatedProduct);
    //     } catch (error) {
    //       console.log(error);
    //       res.status(500).json({ message: "Failed to update product", error });
    //     }
    //   };
      
    //   module.exports.disableProduct = async (req, res) => {
    //     try {
    //       const productId = req.params.id;
    //       const product = await productModel.findById(productId);
      
    //       if (!product) {
    //         return res.status(404).json({ message: "Product not found " });
    //       }
    //       product.disableProduct = !product.disableProduct;
    //       await product.save();
    //       res.json({ message: "Product disable successfully " });
    //     } catch (error) {
    //       console.log(error);
    //       res.status(500).json({ message: "Server error " });
    //     }
    //   };
      
    //   module.exports.blockUser = async (req,res) => {
    //     try{
    //       const user = await userModel.findById(req.params.id);
    //       if(!user){
    //         return res.status(404).json({ message: 'User not found' });
    //       }
      
    //       user.blockStatus = !user.blockStatus;
    //       await user.save();
    //       res.json({ status: true, blockStatus: user.blockStatus });
    //     } catch(error){
    //       res.status(500).json({ message : "Server error", error })
    //     }
    //   };
// const adminModel = require("../Model/adminModel");
// const jwt = require("jsonwebtoken");

// const createToken = (userId) => {
//     const token = jwt.sign({ userId }, "JWT", { expiresIn:"24h"});
//     return token;
// }
// module.exports.login=async(req,res,next) =>{
//     console.log(req.body,"%%%%%%%%%%%%%%%%%%%%%%%")
//     const{email,password}=req.body;
//         try{
//             const emailExist=await userModel.findOne({ email: email });
//             if (emailExist){
//                 return res.json({message:"Email already exists",status:false});
//             }
//             const newUser=new adminModel({
//                 email:email,
//                 password:password,
//             })
//             const userDetails= await newUser.save();
//             const token= createToken(userDetails._id);
//             return res,json({
//                 message:"Account created successfully",
//                 status:true,
//                 token,
//             });
    
//         } catch(error){
//             console.log(error);
//             return res.json({message:"",status:false})
            
//         }
//     };
    
    