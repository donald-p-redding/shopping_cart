import React from "react";
import CartList from "./CartList";

const Header = ({ cart }) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <div class="cart">
        <h2>Your Cart</h2>
        <CartList cartItems={cart}/>
        <button className="button checkout">Checkout</button>
      </div>
    </header>
  )

}

export default Header;