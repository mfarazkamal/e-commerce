import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Box, Icon, IconButton } from '@mui/material';
import { AuthContext } from '../../utils/AuthContext';

export default function ProductCard({ _id:id, name, description, price, stock, productImageUrl }) {
  const navigate = useNavigate();
  const { setCartItemsCount } = React.useContext(AuthContext);
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === id);
    if (existingItem) {
      if (existingItem.quantity + quantity > stock) {
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

  const handleNavigate = () => {
    if (!id) {
      console.error("Product ID is missing:", id);
      return;
    }
    navigate(`/product/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={productImageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{price}</Button>
        <Button size="small" onClick={handleNavigate}>Load Item</Button>
        <Box>
          <IconButton disabled={quantity === 1} style={{ cursor: 'pointer' }} onClick={() => setQuantity(quantity - 1)}>-</IconButton>
          <span>{quantity}</span>
          <IconButton disabled={quantity > stock} style={{ cursor: 'pointer' }} onClick={() => setQuantity(quantity + 1)}>+</IconButton>
        </Box>
        <Button size="small" onClick={handleAddToCart}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
