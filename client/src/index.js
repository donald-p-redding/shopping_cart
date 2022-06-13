import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { ProductsProvider } from "./context/productContext"
import { CartProvider } from "./context/cartContext"

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
