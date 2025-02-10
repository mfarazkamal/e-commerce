import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCard(props) {
    const {name, description, price, productImageUrl} = props;
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
        <Typography variant="body2" sx={{ color: 'text.secondary', textOverflow:'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{price}</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
