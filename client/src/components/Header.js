import { React, useEffect } from "react";
import CartList from "./CartList";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../lib/reducers/cartReducer";
import { cartCheckout } from "../features/cartSlice";

const Header = () => {
  const { cart } = useSelector(state => state);
  const dispatch = useDispatch()

  useEffect(() => {
    const populateCart = async () => {
      const res = await fetch("/api/cart");
      const cartData = await res.json()
      dispatch(cartActions.createCartReceived(cartData))
    }
    populateCart()
  }, [dispatch])

  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <CartList cartItems={cart} />
        <button onClick={() => dispatch(cartCheckout())} className="button checkout">Checkout</button>
      </div>
    </header>
  )

}

export default Header;