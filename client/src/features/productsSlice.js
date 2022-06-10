import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

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
});

export const handleDeleteProduct = createAsyncThunk("products/handleDeleteProduct", async (id) => {
    console.log("hello from delete thunk")
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })

    return id;
});

export const handleAddProduct = createAsyncThunk("products/handleAddProduct", async(newProduct) => {
    const newProdJSON = await fetch("/api/products", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  })
  const contents = await newProdJSON.json()
  return contents
});

export const handleAddToCart = createAsyncThunk("products/handleAddToCart", async(_id) => {
    const resp = await fetch("/api/add-to-cart", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({productId: _id})
  });
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

    builder.addCase(handleDeleteProduct.fulfilled, (state, action) => {
      return state.filter((p) =>  p._id !== action.payload)
    });

    builder.addCase(handleAddProduct.fulfilled, (state, action) => {
      return [...state, action.payload]
    })
  }
})

// const addToCart = async (e) => {
//   e.preventDefault();
//   const resp = await fetch("/api/add-to-cart", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({productId: _id})
//   });

//   const { product:updatedProduct, item:newCartItem } = await resp.json();

//   dispatch(productActions.createProductUpdated(updatedProduct))

//   const inCart = itemInCart(newCartItem._id)

//   dispatch(cartActions.createItemAddedCart({ data: newCartItem, inCart }))
// }

export default productsSlice.reducer;