import { React, useEffect } from "react";
import CartList from "./CartList";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../lib/reducers/cartReducer";

const Header = () => {
  const { cart } = useSelector(state => state);
  console.log("here",cart)
  const dispatch = useDispatch()


  const populateCart = async() => {
    const res = await fetch("/api/cart");
    const cartData = await res.json()
    dispatch(cartActions.createCartReceived(cartData))
  }

  // const handleCheckout = async () => {
  //   try {
  //     const resp = await fetch("/api/checkout", {
  //       method: "POST"
  //     });

  //     if(resp.ok) {
  //       setCart([])
  //     }
  //   } catch(e) {
  //     console.log(e)
  //   }

  // }

  // const handleCartAdd = async (productId) => {
  //   const resp = await fetch("/api/add-to-cart", {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({productId})
  //   });

  //   const { product:updatedProduct, item:newCartItem } = await resp.json();

  //   setProducts(products.map(prod => {
  //     if(prod._id === updatedProduct._id) {
  //       return updatedProduct
  //     }
  //     return prod
  //   }));

  //   if(notInCart(newCartItem._id)) {
  //     setCart([...cart, newCartItem]);
  //   } else {
  //     setCart(cart.map(item => {
  //       if(item._id === newCartItem._id) {
  //         return newCartItem
  //       }
  //       return item;
  //     }));
  //   }
  // }


    useEffect(() => {
      populateCart()
    }, [dispatch])

  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <CartList cartItems={cart}/>
        <button onClick={(e) => {e.preventDefault()}} className="button checkout">Checkout</button>
      </div>
    </header>
  )

}

export default Header;