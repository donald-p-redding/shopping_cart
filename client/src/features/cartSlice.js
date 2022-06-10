import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = []

export const cartRecieved = createAsyncThunk("cart/cartRecieved", async () => {
  const res = await fetch("/api/cart");
  const cartData = await res.json()
  return cartData;
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cartRecieved.fulfilled, (state, action) => {
      return action.payload;
    })
  }
})

export default cartSlice.reducer