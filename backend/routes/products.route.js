import express from "express";
import { addProduct, deleteProduct, productList, singleProduct, updateProduct } from "../controller/product.controller.js";
import { authMiddleware } from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/', productList)
router.get('/:id', singleProduct)
router.post('/add',authMiddleware, addProduct)
router.put('/update/:id',authMiddleware, updateProduct)
router.delete('/delete/:id',authMiddleware, deleteProduct)

export default router