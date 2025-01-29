import express from "express";
import { addProduct, deleteProduct, productList, singleProduct, updateProduct } from "../controller/product.controller.js";

const router = express.Router();

router.get('/', productList)
router.get('/:id', singleProduct)
router.post('/add', addProduct)
router.put('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)

export default router