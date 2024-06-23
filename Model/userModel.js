// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     blockStatus: {
//         type: Boolean,
//         default: false
//     }
// });
// userSchema.pre("save", async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
// });
// module.exports = new mongoose.model("user", userSchema)
    
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const userSchema = new mongoose.Schema({
//     username:{
//         type: String,
//         required: true
//     },
//     email:{
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     blockStatus: {
//         type: Boolean,
//         default: false
//     },
//     wishlist: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'products'
//     }]
// });

// userSchema.pre('save', async function (next) {
//     // Check if password is modified
//     if (!this.isModified('password')) {
//       return next();
//     }
    
//     try {
//       // Hash the password with a salt round of 10
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//       next();
//     } catch (err) {
//       next(err);
//     }
//   });

// module.exports = new mongoose.model("user", userSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const { Schema } = mongoose;

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     blockstatus: {
//         type: Boolean,
//         default: false
//     },
//     cart:{
//         type:Array,
//         required:true
//     },
//     like:{
//         type:Array,
//         required:true
//     },
//     address:{
//         type:Array,
//         required:true
//     },
//     summary:{
//         type:Array,
//         required:true
//     }
    
// });


// userSchema.pre("save", async function(next) {
//     try {
//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(this.password, salt);
//         this.password = hashedPassword;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// module.exports = mongoose.model("user", userSchema);


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }],
    address: {
        type: Array,
        required: true
    }


});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
      }
    
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("user", userSchema);