import { React, useState, useEffect } from "react";
import Header from "./Header"
import Products from "./Products"
import AddProductForm from "./AddProductForm";
import data from '../lib/data'

//array of products

const App = () => {
  const [ products, setProducts ] = useState([])
  //const [ cart, setCart ] = useState([]) eventually plan to implement cart

  const handleAddProduct = async (newProduct) => {
    console.log(newProduct)
    const newProdJSON = await fetch("/api/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
    const contents = await newProdJSON.json()
    setProducts(products.concat(contents))
  }

  useEffect(() => {
    setProducts(data)
  }, [])

  return (
    <div id="app">
      <Header products={products}/>
      <main>
        <Products products={products}/>
        <AddProductForm onAddProduct={handleAddProduct}/>
      </main>
    </div>
  );
};

export default App;
