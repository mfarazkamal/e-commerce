import { useState } from 'react';
import { Button, Box, TextField, Snackbar, Alert } from '@mui/material';

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        productSKU: ''
    });

    const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            setFormData({ name: '', description: '', price: '', stock: '', productSKU: '' }); // Reset form
        } catch (error) {
            setAlert({ open: true, message: error.message, severity: 'error' });
        }
    };

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                <TextField required name="name" label="Product Name" placeholder="Enter Product Name" value={formData.name} onChange={handleChange} />
                <TextField required name="description" label="Product Description" multiline rows={4} placeholder="Enter Product Description" value={formData.description} onChange={handleChange} />
                <TextField required name="price" label="Product Price" type="number" placeholder="Enter Product Price" value={formData.price} onChange={handleChange} />
                <TextField required name="stock" label="Product Stock" type="number" placeholder="Enter Product Stock" value={formData.stock} onChange={handleChange} />
                <TextField required name="productSKU" label="Product SKU" placeholder="Enter Product SKU" value={formData.productSKU} onChange={handleChange} />
            </div>
            <Button type="submit" variant="contained">Add Product</Button>

            {/* Alert Snackbar */}
            <Snackbar open={alert.open} autoHideDuration={4000} onClose={() => setAlert({ ...alert, open: false })}>
                <Alert severity={alert.severity}>{alert.message}</Alert>
            </Snackbar>
        </Box>
    );
}
