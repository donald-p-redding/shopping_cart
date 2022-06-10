import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = []

export const cartRecieved = createAsyncThunk("cart/cartRecieved", async () => {
  const res = await fetch("/api/cart");
  const cartData = await res.json()
  return cartData;
})

export const cartCheckout = createAsyncThunk("cart/cartCheckout", async() => {
      console.log("Hello from delete thunk.")
      const resp = await fetch("/api/checkout", {
        method: "POST"
      });
});

export const handleAddToCart = createAsyncThunk("cart/handleAddToCart", async(_id) => {
  const resp = await fetch("/api/add-to-cart", {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({productId: _id})
});

const { product:updatedProduct, item:newCartItem } = await resp.json();

  //dispatch(//productThunk(updatedProduct))

  return newCartItem;
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cartRecieved.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(cartCheckout.fulfilled, (state, action) => {
      console.log("delete handler")
      return [];
    });

    builder.addCase(handleAddToCart.fulfilled, (state, action) => {
      return [...state, action.payload]
    });
  }
})


// const handleCheckout = async () => {
//   try {
//     const resp = await fetch("/api/checkout", {
//       method: "POST"
//     });

//     if(resp.ok) {
//       dispatch(cartActions.createCartCheckout())
//     }
//   } catch(e) {
//     console.log(e)
//   }
// }

export default cartSlice.reducer