import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = []

export const retrieveProducts = createAsyncThunk("products/retrieveProducts", async () => {
  const data = await fetch("/api/products")
  const parsedData = await data.json()
  return parsedData;
});

export const handleUpdateProduct = createAsyncThunk("products/handleUpdateProduct", async (arg) => {
    const { id, productInfo } = arg;
    const resp = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productInfo)
  })

  const newData = await resp.json()
  return newData;
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retrieveProducts.fulfilled, (state, action) => {
      return action.payload
    });

    builder.addCase(handleUpdateProduct.fulfilled, (state, action) => {
      const updatedProduct = action.payload
      const productId = updatedProduct._id
      
      return state.map((p) => {
        if (p._id === productId) {
          return updatedProduct
        }
        return p
      })
    });
  }
})

export default productsSlice.reducer;