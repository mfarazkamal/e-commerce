import Product from "../models/product.model.js"


export const productList = async (req, res) => {
    try { 
        const products = await Product.find()
        res.status(200).json(products)

    } catch (error) {
        console.log(`Error getting products: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const singleProduct = async (req, res) => {
    try {
        const {productSKU} = req.params;

        if(!productSKU){
            return res.status(400).json({ error: "Please provide productSKU" })
        }

        const product = await Product.findOne({ productSKU })
        res.status(200).json(product)
        
    } catch (error) {
        console.log(`Error getting single product: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });        
    }
}

export const addProduct = async (req, res) => {
    const { name, description, price, stock, productSKU } = req.body

    if(productSKU){
        const productExist = await Product.findOne({ productSKU })
        if(productExist){
            return res.status(400).json({ error: "Product SKU already exist" })
        }
    }

    if (!name || !description || !price || !stock || !productSKU) {
        return res.status(400).json({ error: "Please provide all the fields" })
    }

    if (description.length < 10 || description.length > 500) {
        return res.status(400).json({ error: "Description must be between 10 and 500 characters" })
    }

    if (price <= 0) {
        return res.status(400).json({ error: "Price must be greater than 0" })
    }
    await Product.create({ name, description, price, stock, productSKU })

    res.status(200).json(
        {
            name,
            description,
            price,
            stock,
            productSKU
        }
    )
}

export const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: "Product not found. Provide valid id." })
    }

    const { name, description, price, stock } = req.body;

    if (description.length < 10 || description.length > 500) {
        return res.status(400).json({ error: "Description must be between 10 and 500 characters" })
    }

    if (price <= 0) {
        return res.status(400).json({ error: "Price must be greater than 0" })
    }
    await Product.findByIdAndUpdate(id, { name, description, price, stock })

    res.status(200).json(
        {
            name,
            description,
            price,
            stock,
        }
    )
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: "Product not found. Provide valid id." })
    }

    await Product.findByIdAndDelete(id)
    res.status(200).json({ message: "Product deleted" })
}