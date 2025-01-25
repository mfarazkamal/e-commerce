import express from "express";
import { cancelOrder, orderHistory, placeOrder, singleOrder } from "../controller/orders.controller.js";

const router = express.Router();


router.post("/orders", placeOrder);
router.get("/", orderHistory);
router.get("/:id", singleOrder);
router.delete("/order/:id", cancelOrder);

export default router