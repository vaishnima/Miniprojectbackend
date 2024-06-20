const express = require ("express");
const {
    login,
    AddProduct,
    userData,
    ProductList,
    removeUser,
    deleteProduct,
    editProduct, 
    getProductById
    

 } = require("../Controller/adminController");
const adminAuth = require("../Middleware/adminAuth");

// const adminAuth = require("../Middleware/adminAuth");
// const router = express.Router();
// const createMulterInstance = require("../Middleware/multer");
// const upload = createMulterInstance("products");
const router = express.Router();

//POST

router.post('/login', login);
router.post('/add' , AddProduct);


//Delete Mwthods

router.delete('/user/:userId', removeUser);
router.delete('/product/:productId', deleteProduct)



//GET

router.get("/user",userData);
router.get("/product", ProductList);


router.get('/product/:id',getProductById)

//Put method

router.put('/product/:id', editProduct);





module.exports = router;
