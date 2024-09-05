/* eslint-disable react/prop-types */
import ProductCard from "../components/ProductCard"
import { Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import useProducts from "../hooks/useProducts"

const Home = ({ toggleDrawer }) => {
  const { products, loading } = useProducts()

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Grid
      container
      spacing={1}
      maxWidth={true}
      sx={{ padding: "20px", marginTop: "70px" }}
    >
      {products.map((product) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={product.id}
          sx={{ maxWidth: "300px", minHeight: "350px" }}
        >
          <ProductCard product={product} toggleDrawer={toggleDrawer} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Home
