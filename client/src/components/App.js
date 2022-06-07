import { React, useState, useEffect } from "react";
import Header from "./Header"
import Products from "./Products"
import AddProductForm from "./AddProductForm";
import data from '../lib/data'

//array of products

const App = () => {
  const [ products, setProducts ] = useState([])
  //const [ cart, setCart ] = useState([]) eventually plan to implement cart

  const handleAddProduct = async (newProduct, callback) => {
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
    console.log(callback)
    if (callback) {
      callback()
    }
  }

  const retrieveProducts = async() => {
    const data = await fetch("/api/products")
    const parsedData = await data.json()
    setProducts(parsedData)
  }

  const handleDeleteProduct = async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      setProducts(products.filter((p) => p._id !== id))
    }
  }

  useEffect(() => {
    retrieveProducts()
  }, [])

  return (
    <div id="app">
      <Header products={products}/>
      <main>
        <Products products={products} onDelete={handleDeleteProduct}/>
        <AddProductForm onAddProduct={handleAddProduct}/>
      </main>
    </div>
  );
};

export default App;
