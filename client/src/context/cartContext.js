import { createContext, useReducer } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "cart/cartRecieved": {
      return action.payload
    }
    case "cart/cartCheckout" : {
      return [];
    }
    case "cart/handleAddToCart" : {
      if ((state.findIndex((cartItem) => cartItem._id === action.payload._id) === -1)) {
        return [...state, action.payload.data]
      }
      return state.map((cartItem) => {
        if (cartItem._id === action.payload.data._id) {
          return action.payload.data
        }
        return cartItem
      })
    }
    default: {
      return state;
    }
  }
}

export const cartRecieved = async (dispatch) => {
  const res = await fetch("/api/cart");
  const cartData = await res.json()
  dispatch({type: "cart/cartRecieved", payload: cartData })
}

export const cartCheckout = async (dispatch) => {
  await fetch("/api/checkout", {
    method: "POST"
  });
  dispatch({type: "cart/cartCheckout"})
}

export const handleAddToCart = async(dispatch, _id, secondDispatch) => {
  const resp = await fetch("/api/add-to-cart", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId: _id })
  });
  const data = await resp.json();
  dispatch({type: "cart/handleAddToCart", payload: data.item })
  if (secondDispatch) {
    secondDispatch({type: "products/handleUpdateProduct", payload: data.product})
  }
}

export const CartProvider = ({chidlren}) => {
  const [cartItems, cartDispatch] = useReducer(cartReducer, [])
  return (
    <CartContext.Provider value={{cartItems, cartDispatch}}>
      {chidlren}
    </CartContext.Provider>
  )
}