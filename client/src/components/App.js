import { React, useState, useEffect } from "react";
import Header from "./Header"
import Products from "./Products"
import data from '../lib/data'

//array of products

const App = () => {
  const [ products, setProducts ] = useState([])
  //const [ cart, setCart ] = useState([]) eventually plan to implement cart

  useEffect(() => {
    setProducts(data)
  }, [])

  return (
    <div id="app">
      <Header products={products}/>
      <Products products={products}/>
    </div>
  );
};

export default App;
