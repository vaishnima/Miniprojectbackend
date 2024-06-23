const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const productModel = require('../Model/productModel');
const maxAge = 3 * 24 * 60 * 60;



const createToken = (userId) => {
    const token = jwt.sign({ userId }, "JWT", { expiresIn: maxAge });
    return token;
};

module.exports.signup = async (req, res, next) => {
    console.log(req.body,"%%%%%%%%%%%%%%%%%%%%%%%");
    const { email, password, username} = req.body;
    try{
     const emailExists=await userModel.findOne({ email:email });
     if(emailExists) {
        return res.json({ message:'Email already exists',
        status: false
    });
     }
     const newUser = new userModel({
        username: username,
        email: email,
        password: password,
     });

     const userDetails = await (newUser.save());
     const token = createToken(userDetails._id);
     return res.json({
        message: "Account created successfully",
        status: true,
        token,
     });
    } catch (error) {
        console.log(error);
        return res.json({
            message:"Internal server in sign up",
            status: false,
        });
    }
};


module.exports.login = async (req, res, next) => {
console.log(req.body,"%%%%%%%%%%%%%%%%%%%%%%%");
const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            const passwordMatches = await bcrypt.compare(password,user.password);
            if (passwordMatches) {
                const token = createToken(user._id);
                return res
                  .status(200)
                  .json({
                    username: user,
                    message: "User login successful",
                    created: true,
                    token,
                  });
              } else {
                return res.json({ message: "incorrect password", created: false });
              }
            } else {
              return res.json({ message: "Account not found", created: false });
            }
          } catch (error) {
            console.log(error);
            return res.json({
              message: "Internal server in sign up",
              created: false,
            });
          }
        };
        
        
        module.exports.shopProduct = async (req, res, next) => {
          try {
            const data = await productModel.find();
            res.json({
              message: "Product Data fetched",
              status: true,
              shopProduct: data,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: "Internal server error during product fetching",
              status: false,
            });
          }
        };
        
        
        module.exports.Mens = async (req, res, next) => {
          try {
            const data = await productModel.find({
              category:"Mens"
        
            }
           );
            res.json({
              message: "mens Product Data fetched",
              status: true,
              shopProduct: data,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: "Internal server error during product fetching",
              status: false,
            });
          }
        };
        
        module.exports.Womens = async (req, res, next) => {
          try {
            const data = await productModel.find({
              category:"Womens"
        
            }
           );
            res.json({
              message: "womens Product Data fetched",
              status: true,
              shopProduct: data,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: "Internal server error during product fetching",
              status: false,
            });
          }
        };
        
        module.exports.Kids = async (req, res, next) => {
          try {
            const data = await productModel.find({
              category:"Kids"
        
            }
           );
            res.json({
              message: "kids Product Data fetched",
              status: true,
              shopProduct: data,
            });
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: "Internal server error during product fetching",
              status: false,
            });
          }
        };
        
        //single product

        module.exports.productDetails = async (req, res) => {
          try {
              const productId = req.params.id;
              const singleProduct = await productModel.findById(productId);
              if (singleProduct) {
                  return res.status(200).json({
                      message: "success",
                      status: true,
                      product: singleProduct,
                  });
              }
              res.status(404).json({
                  message: "Product not found",
                  status: false,
              });
          } catch (err) {
              console.log(err);
              res.status(500).json({
                  message: "Internal server error",
                  status: false,
              });
          }
      };

      // module.exports.getReviews = async (req, res) => {
      //   try {
      //     const reviews = await reviewModel
      //       .find({ productId: req.params.productId })
      //       .populate("userId", "username");
      //     res.json(reviews);
      //   } catch (error) {
      //     res.status(500).json({
      //       message: error.message,
      //     });
      //   }
      // };
      
      // module.exports.postReviews = async (req, res) => {
      //   const review = new reviewModel({
      //     productId: req.body.productId,
      //     userId: req.user.id,
      //     rating: req.body.rating,
      //     comment: req.body.comment,
      //   });

      // try {
      //     const newReview = await review.save();
      //     res.status(201).json(newReview);
      //   } catch (error) {
      //     res.status(400).json({
      //       message: error.message,
      //     });
      //   }
      // };
      
      // Add to Wishlist

      module.exports.AddToWishlist = async (req, res) => {
        try {
          const { productId } = req.body;
          const product = await productModel.findById(productId);
      
          if (!product) {
            return res.status(404).json({
              message: "Product not found",
            });
          }
      
          const user = await userModel.findById(req.user._id);
          if (!user) {
            return res.status(404).json({
              message: "User not found",
            });
          }
      
          if (user.wishlist.includes(productId)) {
            // Remove product from wishlist
            user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
            await user.save();
            return res.status(201).json({
              message: "Product removed from wishlist",
            });
          } else {
            // Add product to wishlist
            user.wishlist.push(productId);
            await user.save();
            return res.status(200).json({
              message: "Product added to wishlist",
            });
          }
        } catch (error) {
          res.status(500).json({
            message: "Server error",
          });
        }
      };
      

module.exports.checkWislist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isInWishlist = user.wishlist.includes(productId);
    res.status(200).json({
      inWishlist: isInWishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get Wishlist

// exports.getWishlist = async (req, res) => {
//   try {
//       const userId = req.userId; 
//       const user = await userModel.findById(userId).populate('wishlist');
//       if (!user) {
//           return res.status(404).json({
//               message: "User not found",
//               status: false,
//           });
//       }

//       res.status(200).json({
//           message: "Wishlist fetched",
//           status: true,
//           wishlist: user.wishlist,
//       });
//   } catch (err) {
//       console.log(err);
//       res.status(500).json({
//           message: "Internal server error",
//           status: false,
//       });
//   }
// };

module.exports.getWishlist = async (req, res) => {
  try {
    const data = await userModel.findById(req.user._id).populate("wishlist");

    res.status(200).json(data.wishlist);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};




// Remove from Wishlist

module.exports.removeWishlist = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== productId
    );
    await user.save();

    res.status(200).json({
      message: "product removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

// module.exports.removeWishlist = async (req, res) => {
//   try {
//     const userId = req.userId; 
//     const { productId } = req.body;

//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         status: false,
//       });
//     }

//     user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
//     await user.save();

//     res.status(200).json({
//       message: "Product removed from wishlist",
//       status: true,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Internal server error",
//       status: false,
//     });
//   }
// };




//Add Cart

module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity: quantity });
    }

    await user.save();

    res.status(200).json({
      message: "Product added to cart",
      cart: user.cart,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
      status: false,
    });
  }
};

module.exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId).populate("cart.product");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};


module.exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart.splice(cartItemIndex, 1);
      await user.save();
      return res.status(200).json({
        message: "Product removed from cart",
        cart: user.cart,
        status: true,
      });
    } else {
      return res.status(404).json({
        message: "Product not found in cart",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
      status: false,
    });
  }
};


module.exports.editCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity = quantity;
      await user.save();
      return res.status(200).json({
        message: "Cart updated successfully",
        cart: user.cart,
        status: true,
      });
    } else {
      return res.status(404).json({
        message: "Product not found in cart",
        status: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
      status: false,
    });
  }
};

       