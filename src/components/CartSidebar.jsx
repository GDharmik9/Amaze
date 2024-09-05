/* eslint-disable react/prop-types */

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import CloseIcon from "@mui/icons-material/Close"
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice"

const CartSidebar = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.items)
  const totalPrice = useSelector((state) => state.cart.totalPrice)
  const dispatch = useDispatch()

  const handleIncrease = (item) => {
    dispatch(increaseQuantity(item.id))
  }

  const handleDecrease = (item) => {
    console.log(item.quantity)
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item.id))
    } else {
      dispatch(removeFromCart(item))
    }
  }
  return (
    <Box sx={{ padding: 2, width: "500px", height: "100%", overflowY: "auto" }}>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" gutterBottom>
        Shopping Cart
      </Typography>
      <Divider />
      {cartItems.length === 0 ? (
        <Typography variant="body1" sx={{ padding: 2 }}>
          Your cart is empty.
        </Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                display: "-webkit-box",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    marginRight: 16,
                  }}
                />
                <ListItemText
                  primary={item.title}
                  sx={{ width: "100px", height: "50px", overflow: "hidden" }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => {
                    handleDecrease(item)
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ margin: "0 10px" }}>
                  {item.quantity}
                </Typography>
                <IconButton
                  onClick={() => {
                    handleIncrease(item)
                  }}
                >
                  <AddIcon />
                </IconButton>
              </div>

              <ListItemText
                primary={`$${item.price}`}
                sx={{ justifyContent: "flex-end" }}
              />
            </ListItem>
          ))}
          <Divider />
          <Typography
            variant="h6"
            sx={{ padding: 2, display: "flex", justifyContent: "flex-end" }}
          >
            Total: ${totalPrice}
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Checkout
          </Button>
        </List>
      )}
    </Box>
  )
}

export default CartSidebar
