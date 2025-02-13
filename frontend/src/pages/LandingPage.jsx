import { useEffect, useState } from 'react'
import ProductCard from '../components/LandingPage/ProductCard'
import { Box } from '@mui/material'
import axios from 'axios'

const LandingPage = () => {

    async function login() {
        const res = await axios.get('http://localhost:3000/login')
        console.log(res)
    }

    login();
    const [products, setProducts] = useState()
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/products/')
            const data = await response.json()
            console.log(data)
            setProducts(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                margin: '2rem',
            }}
        >
            {products && products.map((product) => {
                return <ProductCard key={product._id} {...product} />
            })}
        </Box>
    )
}

export default LandingPage