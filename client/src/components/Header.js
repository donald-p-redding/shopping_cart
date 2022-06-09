import { React, useEffect } from "react";
import CartList from "./CartList";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../lib/reducers/cartReducer";

const Header = () => {
  const { cart } = useSelector(state => state);
  const dispatch = useDispatch()


  const populateCart = async() => {
    const res = await fetch("/api/cart");
    const cartData = await res.json()
    dispatch(cartActions.createCartReceived(cartData))
  }

  const handleCheckout = async () => {
    try {
      const resp = await fetch("/api/checkout", {
        method: "POST"
      });

      if(resp.ok) {
        dispatch(cartActions.createCartCheckout())
      }
    } catch(e) {
      console.log(e)
    }
  }

    useEffect(() => {
      populateCart()
    }, [dispatch])

  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <CartList cartItems={cart}/>
        <button onClick={handleCheckout} className="button checkout">Checkout</button>
      </div>
    </header>
  )

}

export default Header;