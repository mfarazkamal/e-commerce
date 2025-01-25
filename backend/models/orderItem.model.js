import mongoose from "mongoose";

const orderItems = mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

const OrderItem = mongoose.model('OrderItem', orderItems)
export default OrderItem;