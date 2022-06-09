import cartReducer from "./cartReducer"
import productsReducer from "./productsReducer"

const rootReducer = (state = {}, action) => {
  return {
    cart: cartReducer(state.cart, action),
    products: productsReducer(state.products, action),
  }
  
}


export default rootReducer