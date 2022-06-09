import { React, useState, useEffect } from "react";
import Header from "./Header"
import Products from "./Products"
import AddProductForm from "./AddProductForm";
import { useDispatch } from "react-redux";


const App = () => {
  const [ cart, setCart ] = useState([])
  const dispatch = useDispatch()

  const notInCart = (id) => {
    return !cart.find(cartItem => cartItem._id === id)
  }

  const populateCart = async() => {
    const res = await fetch("/api/cart");
    const cartData = await res.json()
    setCart(cartData)
  }

  const handleCheckout = async () => {
    try {
      const resp = await fetch("/api/checkout", {
        method: "POST"
      });

      if(resp.ok) {
        setCart([])
      }
    } catch(e) {
      console.log(e)
    }

  }

  const handleCartAdd = async (productId) => {
    const resp = await fetch("/api/add-to-cart", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({productId})
    });

    const { product:updatedProduct, item:newCartItem } = await resp.json();

    setProducts(products.map(prod => {
      if(prod._id === updatedProduct._id) {
        return updatedProduct
      }
      return prod
    }));

    if(notInCart(newCartItem._id)) {
      setCart([...cart, newCartItem]);
    } else {
      setCart(cart.map(item => {
        if(item._id === newCartItem._id) {
          return newCartItem
        }
        return item;
      }));
    }
  }

  useEffect(() => {
    populateCart()
  }, [])

  dispatch({type: "SOMETHING"})

  return (
    <div id="app">
      <Header cart={cart} onCheckout={handleCheckout}/>
      <main>
        <Products onCartAdd={handleCartAdd}/>
        <AddProductForm/>
      </main>
    </div>
  );
};

export default App;
