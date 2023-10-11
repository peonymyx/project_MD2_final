
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import jwt from '../service/jwt';
import { userAction } from '../store/slice/user.slice';

export default function Navbar() {
  const navigate = useNavigate()
  const userStore = useSelector(store => store.userStore);

  return (
    <div id='Navbar'>
      <div className='Navbar-content'>
        <div className='Navbar_left--content'>
          <div className='content'>
            <div id='header_Logo'>
              <span onClick={() => {
                navigate('/')
              }}>E T Q .</span>
            </div>

          </div>
        </div>

        <div className='Navbar_mid--content'>

        </div>
        <div className='Navbar_right--content'>
          {
            userStore.data == null
              ? <>
                <button onClick={() => {
                  navigate('/Login')
                }}>Login</button>
                <button onClick={() => {
                  navigate('/Register')
                }}>Register</button>
              </>
              :
              <div className='user'>
                <div className='user_content'>
                  <img src={userStore.data?.avatar} style={{ width: "50px", height: "50px", borderRadius: "100%" }} />
                  <span style={{ color: "aqua", fontSize: "large" }}>Hi {userStore.data?.userName} </span>
                  
                </div>
                <div className='user_dropdown'>
                  <div className='dropdown_content'>
                    < button onClick={() => {

                      navigate('/Information');

                    }}>Personal Information</button>
                    {
                      userStore.data.isAdmin == true ?
                        <>
                          <button onClick={() => {
                            navigate('/Admin')
                          }}>Manage</button>
                        </> :
                        <>
                          < button onClick={() => {

                            navigate('/Cart');

                          }}>Cart <span style={{backgroundColor:"red", color: "#212121", display:"inline-block", width:"10%", height:"auto", borderRadius:"100%"}}> 
                              {userStore.cart?.reduce((value, cur) => {
                                return value += cur.quantity
                              }, 0)} 
                            </span></button>
                        </>
                    }
                    < button onClick={() => {
                      if (confirm("Do you want to logout?")) {
                        localStorage.clear("token");
                        navigate('/');
                        window.location.reload()
                      }
                    }}>Logout</button>
                  </div>


                </div>
              </div>
          }

        </div>
      </div>
    </div >

  )
}
