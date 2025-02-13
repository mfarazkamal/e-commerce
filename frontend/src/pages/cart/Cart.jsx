import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Box } from '@mui/material';
import { useEffect } from 'react';
const Cart = () => {

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        console.log(data);
    }


    return (
        <Box sx={{ display: 'flex', margin: '1.5rem' }}>
            {cartItems.map((item) => {
                return (
                    <Card key={item.id} sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                        </CardActions>
                    </Card>
                )
            })}
        </Box>
    )
}

export default Cart