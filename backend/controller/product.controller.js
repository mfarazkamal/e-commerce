import Product from "../models/product.model.js"

export const addProduct = async (req, res) => {
    const { name, description, price, stock, productSKU } = req.body
    const productExist = await Product.findOne({ productSKU })

    if (productExist) {
        return res.status(400).json({ error: "Product already exist" })
    }


    // if(!productImage){
    //     return res.status(400).json({ error: "Please provide product image" })
    // }

    if (!name || !description || !price || !stock || !productSKU) {
        return res.status(400).json({ error: "Please provide all the fields" })
    }

    if (description.length < 10 || description.length > 500) {
        return res.status(400).json({ error: "Description must be between 10 and 500 characters" })
    }

    if (price <= 0) {
        return res.status(400).json({ error: "Price must be greater than 0" })
    }

    // if(productImage){
    //     try{
    //         const uploadImage  = await cloudinary.uploader.upload(productImage, {
    //             folder: "products",
    //             resource_type: "image",

    //         })
    //         productImage = uploadImage.secure_url;
    //     }catch(uploadError){
    //         console.error("Cloudinary Upload Error: ", uploadError);
    //         return res.status(500).json({message: "Error uploading image"});
    //     }
    // }

    await Product.create({ name, description, price, stock, productSKU })

    res.status(200).json(
        {
            // id: productExist._id,
            name,
            description,
            price,
            stock,
            productSKU
        }
    )
}

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
        const { id } = req.params;


        if (!id) {
            return res.status(400).json({ error: "Please provide correct id" })
        }

        const product = await Product.findOne({ _id: id })

        res.status(200).json(product)

    } catch (error) {
        console.log(`Error getting single product: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: "Product not found. Provide valid id." })
        }

        if(Product.productSKU != req.body.productSKU){
            return res.status(400).json({ error: "Product SKU cannot be updated" })
        }

        const { name, description, price, stock } = req.body;
        console.log(name, description, price, stock)

       if(description.length < 10 || description.length > 500){
            return res.status(400).json({ error: "Description must be between 10 and 500 characters" })
        }

        if (price <= 0) {
            return res.status(400).json({ error: "Price must be greater than 0" })
        }

        await Product.findByIdAndUpdate(id,
            {
                name: name || Product.name,
                description: description || Product.description,
                price: price || Product.price,
                stock: stock || Product.stock,
            })

        res.status(200).json(
            {
                name,
                description,
                price,
                stock
            }
        )
    } catch (error) {
        console.log(`Error updating product: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: "Product not found. Provide valid id." })
    }

    await Product.findByIdAndDelete(id)
    res.status(200).json({ message: "Product deleted" })
}