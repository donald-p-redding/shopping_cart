import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { ProductsProvider } from "./context/productContext"

ReactDOM.render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>


  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
