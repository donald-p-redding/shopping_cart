import React from "react";
import CartList from "./CartList";

const Header = ({ products }) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <div class="cart">
        <h2>Your Cart</h2>
        <CartList cartItems={products}/>
        <a class="button checkout">Checkout</a>
      </div>
    </header>
  )

}

export default Header;