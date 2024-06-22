// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     brand: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Boolean,
//         required: true
//     },
//     gender: {
//         type: String,
//         required: true
//     },
//     isLuxury: {
//         type: Boolean,
//         required: true
//     },
//     dateAdded: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         required: true
//     }
// });
// productSchema.pre("save", async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
// });
// module.exports = new mongoose.model("product", productSchema)
// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   brand: {
//     type: String,
//     required: true,
//   },
  
//   price: {
//     type: Number,
//     required: true,
//   },
  
  
//   dateAdded: {
//     type: Date,
//     default: Date.now,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
  
//   image: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = new mongoose.model("product", productSchema);
const mongoose =require("mongoose");
const productSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String,
    category:String
    
});

const Product= mongoose.model('products',productSchema);
module.exports=Product;