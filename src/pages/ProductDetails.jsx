/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"
import {
  Button,
  Typography,
  CardMedia,
  Box,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { useSelector } from "react-redux"
import useProduct from "../hooks/useProduct"
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/cartSlice"
import { useDispatch } from "react-redux"

const ProductDetails = ({ toggleDrawer }) => {
  const { id } = useParams()
  const { product } = useProduct(id)
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  )
  console.log(cartItem)
  const dispatch = useDispatch()

  if (!product) {
    return <Typography>Product not found.</Typography>
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    toggleDrawer()
  }

  const handleIncrease = () => {
    dispatch(increaseQuantity(product.id))
  }

  const handleDecrease = (quantity) => {
    console.log(quantity)
    if (quantity > 1) {
      dispatch(decreaseQuantity(product.id))
    } else {
      dispatch(removeFromCart(product))
    }
  }

  return (
    <Box sx={{ display: "flex", gap: "20px", padding: "70px 20px 0 20px" }}>
      <CardContent>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain", height: "500px", width: "500px" }}
        />
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            ${product.price}
          </Typography>
          {cartItem && cartItem.quantity >= 1 ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => {
                  handleDecrease(cartItem.quantity)
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ margin: "0 10px" }}
              >
                {cartItem.quantity}
              </Typography>
              <IconButton onClick={handleIncrease}>
                <AddIcon />
              </IconButton>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </CardActions>
      </CardContent>

      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h3" color="text.primary">
          {product.title}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Description: {product.description}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Category: {product.category}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          popularity: {product.popular}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          model: {product.model}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          brand: {product.brand}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          color: {product.color}
        </Typography>
      </CardContent>
      {/*add product other details here in table form*/}
    </Box>
  )
}

export default ProductDetails
