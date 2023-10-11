import React, { useState } from 'react'
import { useEffect } from "react"
import jwt from "../service/jwt"
import { userAction } from "../store/slice/user.slice"
import { useSelector, useDispatch } from "react-redux"
import { randomId } from '@mieuteacher/meomeojs'
import Carousel from './Carousel'
export default function Home() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null)
  const productStore = useSelector(store => store.productStore)
  const userStore = useSelector(store => store.userStore)
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 6
  const lastIndex = currentPage * recordPerPage
  const firtIndex = lastIndex - recordPerPage
  const records = productStore.data.slice(firtIndex, lastIndex);
  const npage = Math.ceil(productStore.data.length / recordPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)


  function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + '.')) + prev
    }) + " VNĐ"
  }

  useEffect(() => {

    if (localStorage.getItem("token")) {
      const user = jwt.verifyToken(localStorage.getItem("token"), import.meta.env.VITE_PRIVATE_KEY)
      if (user) {
        dispatch(userAction.setData(user))
      }
      else {
        localStorage.clear("token");
        window.location.reload()
      }
    }
  }, [])
  useEffect(() => {

  }, [product])

  function prePage() {
    if (currentPage !== firtIndex) {
      setCurrentPage(currentPage - 1)
    }
  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }



  return (
    <div id='main'>
      <Carousel />
      <div className='Home'>
        <div className='products'>
          {
            records.map((product) => {
              if (product.status == true)
                return (
                  <div className='product' key={randomId()} onClick={() => {
                    setProduct(product);
                    document.getElementById("product_infor").style.display = "block";
                  }}>
                    <img src={product.images} style={{ width: "65%", height: "65%", marginTop: "5%", borderRadius: "5%" }} />
                    <span>{product.productName}</span>
                    <span>{formatCash(String(product.price))}</span>
                    <span>{product.category}</span>
                  </div>
                )
            })
          }
        </div>
        <nav>
          <ul className='pagination'>
            <li className='page-item'>
              <a className='page-link' onClick={() => {
                if (currentPage == 1) {
                  return
                } else {
                  prePage()
                }
              }}>Prev </a>
            </li>

            {
              numbers.map((n, i) => {
                return (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={randomId()}>
                    <a className='page-link' onClick={() => {

                      changeCPage(n)
                    }}> {n} </a>
                  </li>
                )
              })
            }
            <li className='page-item'>
              <a className='page-link' onClick={() => {
               if(currentPage == npage){
                return
               
            }
            else{
                 nextPage()
            }
              }}>Next </a>
            </li>
          </ul>
        </nav>
      </div>

      <div id='product_infor'>
        <button id='turn-off' onClick={() => {
          document.getElementById("product_infor").style.display = "none";
        }}>X</button>

        {
          product ?
            <div className='infor'>
              <div className='img'>
                <img src={product.images} alt="" />

              </div>

              <div className='content'>
                <h2>{product.productName}</h2>
                <span>{product.category}</span>
                <h3>{formatCash(String(product.price))}</h3>
                <button onClick={async () => {
                  dispatch(userAction.addCart(product))
                }}>Add to bag</button>
                {product.introduce}
                <span style={
                  {
                    fontWeight: "bold"
                  }
                }>Free & Fast delivery</span>
                <span>Order on business days before 23:30 and we ship your order that same day. Fast like we are furious.</span>
                <span style={
                  {
                    fontWeight: "bold"
                  }
                }>Easy returns & Free exchanges within the EU
                </span>
                <span>Exchange or return your product(s) within 14 days of receiving your order</span>
              </div>
            </div>
            : <></>
        }



      </div>

    </div>
  )
}
