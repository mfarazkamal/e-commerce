import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";


export const placeOrder = async (req, res) => {

    try {
        
        const { items, user_id, total_amount } = req.body;

        if (items.length === 0) {
            return res.status(400).json({ error: "Please provide items to place order" });
        }

        if (!user_id) {
            return res.status(400).json({ error: "Please login to place order" });
        }

        const itemIds = items.reduce((acc, item) => {
            return [...acc, item.id]
        }, [])

        console.log(itemIds);

        const orderItems = await Product.find({ _id: { $in: itemIds } })

        if (orderItems.length === 0 || items.length !== orderItems.length) {
            return res.status(400).json({ error: "Invalid products" });
        }

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            for (let j = 0; j < orderItems.length; j++) {
                if (orderItems[j].id === item.id && orderItems[j].stock < item.quantity) {
                    return res.status(400).json({ error: "Insufficient stock" });
                }
                if(orderItems[j].id === item.id){
                    orderItems[j].quantity = item.quantity
                }
            }
        }

        console.log(orderItems);

        let totalAmount = orderItems.reduce((acc, item) => acc + Number(item.price*item.quantity), 0)

        console.log(totalAmount, total_amount);

        if (totalAmount !== total_amount) {
            return res.status(400).json({ error: "Invalid total amount" });
        }

        const order = await Order.create({
            user_id,
            total_amount,
            status: "pending"
        })

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const requiredOrderItem = orderItems.filter((orderItem) => orderItem.id === item.id)[0];
            await OrderItem.create({
                order_id: order._id,
                product_id: item.id,
                price: requiredOrderItem.price,
                quantity: item.quantity
            })
        }

        orderItems.forEach(async (item) => {
            await Product.updateOne({ _id: item._id }, { $inc: { stock: -item.quantity } })
        })

        return res.status(200).json(order);
    } catch (error) {
        console.log(`Error creating order: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const orderHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({ error: "Please login to get order history" });
        }

        const orders = await Order.find({ user_id: userId }).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(400).json({ error: "No orders found" });
        }

        const allOrders = await Promise.all(orders.map(async (order) => {
            const orderItems = await OrderItem.find({ order_id: order._id }).populate("product_id", "name description price");
            console.log(orderItems);
            return {
                orderId: order._id,
                totalAmount: order.total_amount,
                status: order.status,
                items: orderItems.map((item) => ({
                    productId: item.product_id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    quantity: item.quantity
                }))
            }
        }))

        res.status(200).json(allOrders);

    } catch (error) {
        console.log(`Error getting order history: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const singleOrder = (req, res) => {
    try {


    } catch (error) {

    }
}

export const cancelOrder = (req, res) => {
    /*
    order id from front end
    extract order from order id to check if not cancelled or delivered ? :
    extract order items from order id
    update order items stock/inventory
    update order status to cancelled
    */
}