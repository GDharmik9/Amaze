//Create a hook to fetch signle product data from the API

import { useState, useEffect } from "react"

const useProduct = (id) => {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate an API call to fetch product
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.in/api/products/${id}`)

      const data = await response.json()
      console.log(data)
      setProduct(data.product)
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  return { product, loading }
}

export default useProduct
