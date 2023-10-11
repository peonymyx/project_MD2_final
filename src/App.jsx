import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./components/Home"
import Admin from "./pages/Admin"
import { Route, Routes } from 'react-router-dom'
import './main.scss'
import { useEffect, useState } from "react"
import jwt from "./service/jwt"
import { api } from "./service/apis"
import { userAction } from "./store/slice/user.slice"
import { useSelector, useDispatch } from "react-redux"
import { productAction } from "./store/slice/product.slice"
import axios from "axios"
import Cart from "./pages/Cart"
import Personal from "./pages/Personal"
function App() {
  const dispatch = useDispatch()
  const userStore = useSelector(store => store.userStore)
  useEffect(() => {
    if (userStore.cart && userStore.data) {
      axios.patch(`http://localhost:3000/users/${userStore.data?.id}`, {
        cart: [...userStore.cart]
      })
    }
  }, [userStore.cart])

  useEffect(() => {
    if (userStore.receipts && userStore.data) {
      axios.patch(`http://localhost:3000/users/${userStore.data?.id}`, {
        receipts: [...userStore.receipts]
      })
    }
  }, [userStore.receipts])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let user = jwt.verifyToken(localStorage.getItem("token"), import.meta.env.VITE_PRIVATE_KEY);
      if (!user) {
        localStorage.removeItem("token")
        return
      }
      axios.get(`http://localhost:3000/users/${user.id}`)
        .then(res => {
          dispatch(userAction.setData(res.data))
          dispatch(userAction.setCart(res.data.carts ?? []))
          dispatch(userAction.setReceipts(res.data.receipts ?? []))
        })
    }
  }, [])
  
  useEffect(() => {
    api.productApi.findAll()
      .then(res => {
        dispatch(productAction.getProducts(res.data))
      })
  }, [])
  return (
    <div id="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Admin" element={<Admin />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/Information" element={<Personal />}></Route>
        <Route path='/Login' element={<Login />}> Login </Route>
        <Route path='/Register' element={<Register />}> Register </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
