import { createContext, useReducer } from "react";

export const ProductsContext = createContext();

const productsReducer = (state, action) => {
  switch (action.type) {
    case "products/retrieveProducts": {
      return action.payload
    }
    case "products/handleUpdateProduct": {
      const thisID = action.payload._id
      return state.map((p) => {
        if (p._id === thisID) {
          return action.payload
        }
        return p
      })
    }
    case "products/handleDeleteProduct": {
      return state.filter((p) => p._id !== action.payload)
    }
    case "products/handleAddProduct": {
      return [...state, action.payload]
    }
    default: {
      return state;
    }
  }
};

export const retrieveProducts = async (dispatch) => {
  const data = await fetch("/api/products")
  const parsedData = await data.json()
  dispatch({ type: "products/retrieveProducts", payload: parsedData })
}

export const handleUpdateProduct = async (dispatch, arg) => {
  const { id, productInfo } = arg;
  const resp = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productInfo)
  })
  const newData = await resp.json()
  dispatch({ type: "products/handleUpdateProduct", payload: newData })
}

export const handleDeleteProduct = async (dispatch, id) => {
  await fetch(`/api/products/${id}`, {
    method: 'DELETE',
  })
  dispatch({ type: "products/handleDeleteProduct", payload: id })
}

export const handleAddProduct = async (dispatch, newProduct) => {
  const newProdJSON = await fetch("/api/products", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  })
  const contents = await newProdJSON.json()
  dispatch({ type: "products/handleAddProduct", payload: contents })
}


export const ProductsProvider = ({ children }) => {
  const [products, dispatch] = useReducer(productsReducer, []);

  return (
    <ProductsContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};