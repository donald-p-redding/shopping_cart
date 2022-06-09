const productsReducer = (state = [], action) => {
  switch (action.type) {
    case "PRODUCTS_RECIEVED": {
      return action.payload;
    }
    case "PRODUCT_ADDED": {
      return [...state, action.payload]
    }
    case "PRODUCT_DELETED": {
      return state.filter((p) =>  p._id !== action.payload)
    }
    case "PRODUCT_UPDATED": {
      const thisID = action.payload._id
      return state.map((p) => {
        if (p._id === thisID) {
          return action.payload
        }
        return p
      })
    }  
    default:
      return state
  }
}

const createProductsRecieved = (data) => {
  return {
    type: "PRODUCTS_RECIEVED",
    payload: data,
  }
} 

const createProductAdded = (data) => {
  return {
    type: "PRODUCT_ADDED",
    payload: data,
  }
}

const createProductDeleted = (id) => {
  return {
    type: "PRODUCT_DELETED",
    payload: id,
  }
}

const createProductUpdated = (data) => {
  return {
    type: "PRODUCT_UPDATED",
    payload: data
  }
}

export const productActions = {
  createProductAdded,
  createProductDeleted,
  createProductsRecieved,
  createProductUpdated
}


export default productsReducer

