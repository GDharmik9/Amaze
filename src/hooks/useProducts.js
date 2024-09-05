import { useState, useEffect } from "react"

const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate an API call to fetch products
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.in/api/products")

      const data = await response.json()
      console.log(data)
      setProducts(data?.products)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return { products, loading }
}

export default useProducts
