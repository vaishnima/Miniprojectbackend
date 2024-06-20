const express = require ("express");
const { 
    signup,
    login,
    shopProduct,
    Mens,
    Womens,
    Kids,
    productDetails,
    getReviews,
    postReviews,
    // AddToWishlist,
    // checkWislist
    // getWishlist,
    // removeWishlistItem,
     addCart,
     removeCart
    
    } = require('../Controller/userController');
    

    // const  { verifyToken }   = require('../Middleware/userAuth');

const router = express.Router()
// const userAuth = require("../Middleware/userAuth")
// router.get('/',userAuth)

//POST

router.post('/signup',signup);
router.post('/login',login);
router.post("/reviews/create", postReviews);
// router.post("/wishlist", AddToWishlist);
// router.post('/wishlist', verifyToken, addToWishlist); 
// router.post('/cart', addToCart);

//GET

router.get('/shop',shopProduct)
router.get("/mens", Mens);
router.get("/womens", Womens);
router.get("/kids", Kids);
router.get("/shop/:id", productDetails);
router.get("/reviews/:productId", getReviews);
// router.get("/wishlist/check/:productId", checkWislist);

// router.get('/wishlist', verifyToken, getWishlist);
// DELETE
// router.delete('/wishlist/:productId', verifyToken, removeWishlistItem); 

//Cart code

router.post('/addcart',addCart)
router.delete('/removecart',removeCart)

module.exports=router;


