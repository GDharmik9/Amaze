/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  CardActions,
  IconButton,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice"
import { useNavigate } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"

const ProductCard = ({ product, toggleDrawer }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  )

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    toggleDrawer()
  }

  const handleIncrease = () => {
    dispatch(increaseQuantity(product.id))
    toggleDrawer()
  }

  const handleDecrease = (quantity) => {
    console.log(quantity)
    if (quantity > 1) {
      dispatch(decreaseQuantity(product.id))
      toggleDrawer()
    } else {
      dispatch(removeFromCart(product))
      toggleDrawer()
    }
  }

  return (
    <Card sx={{ width: "100%", height:"385px" }}>
      <CardContent onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="h6" sx={{ height: "60px", overflow: "hidden" }}>
            {product.title}
          </Typography>
          {/* <Typography variant="body1" gutterBottom>
          {product.description}
        </Typography> */}
        </CardContent>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h6">${product.price}</Typography>
        {cartItem && cartItem.quantity >= 1 ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => {
                handleDecrease(cartItem.quantity)
              }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ margin: "0 10px" }}>
              {cartItem.quantity}
            </Typography>
            <IconButton onClick={handleIncrease}>
              <AddIcon />
            </IconButton>
          </div>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default ProductCard
