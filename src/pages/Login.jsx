import React from 'react'
import jwt from '../service/jwt'
import { api } from '../service/apis';
import { useEffect } from 'react';
import { userAction } from '../store/slice/user.slice';
import { useDispatch } from 'react-redux';
export default function Login() {
  const dispatch = useDispatch()
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
    if(localStorage.getItem("token")) {
      alert("You are signed in!")
      window.location.href = "/"
    }
  }, [])
  function checkEmail() {
    var email = document.getElementById('mail');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
      alert('Please enter a valid email address. ');
      email.focus;
      return false;
    }
    else {
      return true;
    }
  }

  async function handleLogin() {
  
    let data = {
      email: document.getElementById("mail").value,
      password: document.getElementById("password").value
    }
    await api.userApi.findByEmail(data.email)
    .then(res => {
      if(res.data.length != 0) {
        
        if(data.password != jwt.verifyToken(res.data[0].password, import.meta.env.VITE_PRIVATE_KEY)) {
          alert("Wrong Password!")
          return
        }
        if(res.data[0].status == false){
          alert("Your account may also be restricted or terminated for any reason, at our sole discretion! ")
          return
        }
        let token = jwt.createToken(res.data[0])
        localStorage.setItem("token", token)
        window.location.href = "/"
      }else {
        alert(" No such account exists! ")
      }
    })
  }

  return (
    <div id='main'>
      <div className='Login'>
        <div id='form'>
          <form id='form_content' >
            <h2 className='form_name'>Đăng Nhập</h2>
            <input type="text" id='mail' placeholder='email' required />

            <input type="password" id='password' placeholder='password' required />

            <button type='submit' onClick={(e) => {
              e.preventDefault();
              if (checkEmail()) {
                handleLogin()
              }

            }}>Login</button>
          </form>
        </div>

      </div>
    </div>
  )
}
