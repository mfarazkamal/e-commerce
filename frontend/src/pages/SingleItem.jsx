import { Box, Card, CardMedia } from '@mui/material';

export default function SingleItem() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Card sx={{ maxWidth: 500, margin: '2rem 1rem' }}>
        <CardMedia
          component="img" // Ensure it is an image component
          sx={{ height: '80vh', objectFit: 'contain', width: '100vw' }} // Adjust height for better visibility
          image="https://via.placeholder.com/500" // Use a valid image URL for testing
          title="Example Image"
        />
      </Card>
    </Box>
    );
}

