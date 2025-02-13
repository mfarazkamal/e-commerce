import { Box, Button, Card, CardMedia, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

export default function SingleItem() {

    const { id } = useParams();
    console.log('Item id', id);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { setCartItemsCount } = useContext(AuthContext)

    const handleAddToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(item => item.id === id);
        if (existingItem) {
            if (existingItem.quantity + quantity > product?.stock) {
                alert("Quantity exceeds stock");
                return;
            }
            existingItem.quantity += quantity;
        } else {
            cartItems.push({ id, quantity });
        }
        const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemsCount(cartItemsCount);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    useEffect(() => {
        if (!id || id === "undefined") {
            console.error("Invalid product ID:", id);
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${id}`);
                const data = await response.json();
                setProduct(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }

        fetchProduct();
    }, [id]);

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "2rem",
                height: "90vh",
            }}
        >
            {/* Left Section - Product Image */}
            <Card sx={{ flex: 1, maxWidth: 500 }}>
                <CardMedia
                    component="img"
                    sx={{ height: "80vh", objectFit: "contain", width: "100%" }}
                    image={product?.productImageUrl || "https://via.placeholder.com/300"}
                    title={product?.name}
                />
            </Card>

            {/* Right Section - Product Details */}
            <Box sx={{ display: "flex", flexDirection: "column", padding: "2rem", textAlign: "center", maxWidth: 600 }}>
                <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                    {product?.name}
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary={`Price: ₹${product?.price}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`✔ Description: ${product?.description}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Total Stock: ${product?.stock}`} />
                    </ListItem>
                    <Box  sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around',border: '1px solid #ccc', borderRadius: '8px', width: '25%', margin: '0 auto'}}>
                        <IconButton disabled={quantity === 1} style={{ cursor: 'pointer' }} onClick={() => setQuantity(quantity - 1)}>-</IconButton>
                        <span>{quantity}</span>
                        <IconButton disabled={quantity > product.stock} style={{ cursor: 'pointer' }} onClick={() => setQuantity(quantity + 1)}>+</IconButton>
                    </Box>
                    <Button size="small" onClick={handleAddToCart}>Add to Cart</Button>
                </List>
            </Box>
        </Box>
    );
}
