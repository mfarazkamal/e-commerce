import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['completed', 'cancelled', 'delivered'],
        default: 'pending',
        required: true
    },
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)
export default Order;