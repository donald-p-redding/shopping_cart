import React, { useContext } from "react";
import CartList from "./CartList";
import { CartContext } from "../context/cartContext";

import { cartCheckout } from "../context/cartContext";
const Header = () => {
  const {cartDispatch} = useContext(CartContext)
  const handleCheckout = (e) => {
    e.preventDefault();
    cartCheckout(cartDispatch)
  }

  return (
    
      <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <CartList />
        <button onClick={handleCheckout} className="button checkout">Checkout</button>
      </div>
    </header>
    
    
  )

}

export default Header;