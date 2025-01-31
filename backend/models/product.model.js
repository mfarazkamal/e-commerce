import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 500
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    productSKU: {
        type: String,
        required: true,
        unique: true
    }
    // productImageUrl:{
    //     type: String,
    //     required: true
    // }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)
export default Product;