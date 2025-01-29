import express from "express";
import { cancelOrder, orderHistory, placeOrder, singleOrder } from "../controller/orders.controller.js";

const router = express.Router();


router.post("/", placeOrder);
router.get("/", orderHistory);
router.get("/:id", singleOrder);
router.delete("/:id", cancelOrder);

export default router