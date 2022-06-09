const cartReducer = (state=[], action) => {
  switch (action.type) {
    case "CART_RECEIVED": {
      return action.payload
    }
    case "ITEM_ADDED_CART" : {
      if (!action.payload.inCart) {
        return [...state, action.payload.data]
      }
      return state.map((cartItem) => {
        if (cartItem._id === action.payload.data._id) {
          return action.payload.data
        }
        return cartItem
      })
    }
    case "CART_CHECKOUT" : {
      return [];
    }
    default:
      return state
  }
}

const createCartReceived = (data) => {
  return {
    type: "CART_RECEIVED",
    payload: data,
  }
}

const createItemAddedCart = (data, inCart) => {
  return {
    type: "ITEM_ADDED_CART",
    payload: {data, inCart}
  }
}

const createCartCheckout = () => {
  return {
    type: "CART_CHECKOUT",
  }
}
// move to cart list
// const handleCartAdd = async (productId) => {
//   const resp = await fetch("/api/add-to-cart", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({productId})
//   });

//   const { product:updatedProduct, item:newCartItem } = await resp.json();

//   dispatch(productActions.createProductUpdated(updatedProduct))

// }
export const cartActions = {
  createCartCheckout,
  createCartReceived,
  createItemAddedCart,
}

export default cartReducer