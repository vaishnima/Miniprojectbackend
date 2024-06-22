const express = require ("express");
const { 
    signup,
    login,
    shopProduct,
    Mens,
    Womens,
    Kids,
    productDetails,
    // getReviews,
    // postReviews,
    AddToWishlist,
    checkWislist,
    getWishlist,
    removeWishlist,
    addToCart,
    getCart,
    removeFromCart,
    editCart
    
    } = require('../Controller/userController');
    

    // const  { verifyToken }   = require('../Middleware/userAuth');
const userAuth = require("../Middleware/userAuth")
const router = express.Router()

// router.get('/',userAuth)

//POST

router.post('/signup',signup);
router.post('/login',login);
// router.post("/reviews/create", postReviews);
router.post("/wishlist",userAuth, AddToWishlist);

// router.post('/cart', addCart);

//GET

router.get('/shop',shopProduct)
router.get("/mens", Mens);
router.get("/womens", Womens);
router.get("/kids", Kids);
router.get("/shop/:id", productDetails);
// router.get("/reviews/:productId", getReviews);
// router.get("/wishlist/check/:productId", checkWislist);

// router.get('/wishlist', verifyToken, getWishlist);
router.get("/wishlist/check/:productId",userAuth, checkWislist);
router.get("/wishlist",userAuth,  getWishlist);
//DELETE
router.delete("/wishlist/remove/:productId",userAuth, removeWishlist);



//Cart code

router.post('/cart/add',userAuth, addToCart)
router.get('/cart',userAuth, getCart)
router.delete('/cart/remove',userAuth, removeFromCart)
router.put('/cart/edit',userAuth, editCart);

module.exports=router;


