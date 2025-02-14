import express from "express";
import { cancelOrder, orderHistory, placeOrder, singleOrder } from "../controller/orders.controller.js";
import { authMiddleware } from "../middleware/protectRoute.js";

const router = express.Router();


router.post("/",authMiddleware, placeOrder);
router.get("/",authMiddleware, orderHistory);
router.get("/:id",authMiddleware, singleOrder);
router.delete("/:id",authMiddleware, cancelOrder);

export default router