import { useEffect, useState } from 'react'
import ProductCard from '../components/LandingPage/ProductCard'

const LandingPage = () => {

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

    useEffect(()=>{
        fetchProducts()
    }, [])
  return (
    <div>
        {products && products.map((product) => {
            return <ProductCard key={product._id} {...product} />
        })}
    </div>
  )
}

export default LandingPage