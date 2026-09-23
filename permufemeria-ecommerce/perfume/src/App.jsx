 import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import Navbar from "./Components/Navbar/Navbar"
import DetailsProduct from "./Components/DetailsProduct/DetailsProduct"
import { CartProvider } from "./Components/CartContext/CartContext"
import Cart from "./Components/Cart/Cart"

import Footer from "./Components/Footer/Footer"
import NewProductList from "./Components/NewProductList/NewProductList"
import SearProductList from "./Components/SearProductList/SearProductList"
import ScrollToTop from "./Components/Scroll/ScrollToTop "
 
function App() {

  return (
    <>
      <CartProvider> 
     <Router>
     <Navbar/>
     <ScrollToTop/>
     <Routes> 
     <Route path="/" element ={  <Home /> }/>
     <Route path="/producto/:id" element ={  <DetailsProduct/> }/>
     <Route path="/carrito" element ={  <Cart/> }/>
     <Route path="/new" element ={< NewProductList/> }/>
     <Route path="/search" element ={< SearProductList/> }/>
     </Routes> 
     <Footer/> 
     </Router>
     </CartProvider>
    </>
  )
}

export default App
