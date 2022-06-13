import { React, useState, useEffect } from "react";
import Header from "./Header"
import Products from "./Products"
import AddProductForm from "./AddProductForm";
import { CartProvider } from "../context/cartContext";

const App = () => {
  return (
    <div id="app">
      <CartProvider>
        <Header />
      </CartProvider>
      
      <main>
        <Products/>
        <AddProductForm />
      </main>
    </div>
  );
};

export default App;
