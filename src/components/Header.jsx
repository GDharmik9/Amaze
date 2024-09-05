/* eslint-disable react/prop-types */
import { useState } from "react"
import { AppBar, Toolbar, IconButton, Typography, Drawer } from "@mui/material"
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material"
import CartSidebar from "./CartSidebar" // Import the CartSidebar component
import logo from "../assets/AmazeLogo.png"

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="logo" style={{ width: "200px"}} />
          </Typography>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{ sx: { width: 500 } }}
      >
        <CartSidebar onClose={toggleDrawer} />
      </Drawer>
    </>
  )
}

export default Header
