import { useState } from 'react';
import { Button, Box, TextField, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        productSKU: '',
        productImage: ''
    });

    const navigate = useNavigate();
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    // Handle input change
    const handleChange = (e) => {

        if (e.target.name === 'productImage') {
            console.log(e.target.files);
            const file = e.target.files[0];
            console.log(file);
            const reader = new FileReader();

            reader.onloadend = () => {
                console.log(reader.result);
                setFormData({ ...formData, [e.target.name]: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            setAlert({ open: true, message: 'Product added successfully!', severity: 'success' });
            setFormData({ name: '', description: '', price: '', stock: '', productSKU: '', productImage: '' });
            setTimeout(() => {
                navigate('/')
            }, 5000)
        } catch (error) {
            setAlert({ open: true, message: error.message, severity: 'error' });
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '2rem',
                width: '100%',
                borderRadius: '10px',
                maxWidth: '400px',
                padding: '1.5rem 3rem',
                overflowY: 'hidden',
                margin: '2.5rem auto',
            }}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}

        >
            <h1 style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#4B5563',
                fontSize: '3.5rem',
                margin: '0',
                textTransform: 'uppercase',

            }}>Add Product</h1>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '100%',
                }}
            >
                <TextField required name="name" label="Product Name" placeholder="Enter Product Name" value={formData.name} onChange={handleChange} />
                <TextField required name="description" label="Product Description" multiline rows={4} placeholder="Enter Product Description" value={formData.description} onChange={handleChange} />
                <TextField required name="price" label="Product Price" type="number" placeholder="Enter Product Price" value={formData.price} onChange={handleChange} />
                <TextField required name="stock" label="Product Stock" type="number" placeholder="Enter Product Stock" value={formData.stock} onChange={handleChange} />
                <TextField required name="productSKU" label="Product SKU" placeholder="Enter Product SKU" value={formData.productSKU} onChange={handleChange} />
                <TextField type='file' required name="productImage" label="Product SKU" placeholder="Enter Product SKU" onChange={handleChange} />
            </div>
            <Button type="submit" variant="contained">Add Product</Button>

            {/* Alert Snackbar */}
            <Snackbar open={alert.open} autoHideDuration={4000} onClose={() => setAlert({ ...alert, open: false })}>
                <Alert severity={alert.severity}>{alert.message}</Alert>
            </Snackbar>
        </Box>
    );
}
