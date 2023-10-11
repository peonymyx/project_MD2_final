import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { uploadFileToStorage } from "../../firebase"
import jwt from '../service/jwt';
import { api } from '../service/apis';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  useEffect(() => {
    if(localStorage.getItem("token")) {
      window.location.href = "/"
    } 
  }, [])
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg");
  function checkPass() {
    let pass = document.getElementById("password");
    let confirm = document.getElementById("confirmPass");
    if(!pass.value || !confirm.value){
      alert("Vui long nhap mat khau")
    }
    else{
      if (pass.value != confirm.value) {
      alert("the passwords do not match. please enter the password again.");
      confirm.focus;
      return false;

    }
    else { return true }
    }
    
  }
  function checkEmail() {
    var email = document.getElementById('mail');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
      alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
      email.focus;
      return false;
    }
    else {
      return true;
    }
  }
  async function handleNewUser() {

    let data = {
      userName: document.getElementById("username").value,
      password: jwt.createToken(document.getElementById("password").value),
      email: document.getElementById("mail").value,
      avatar: avatar,
      isAdmin: false,
      status: true,
      cart: [],
      receipts: [],
    }

    let res = await api.userApi.findByEmail(data.email);
    if (res.data.length > 0) {
      alert("tài khoản đã tồn tại")
    } else {
      api.userApi.register(data)
        .then(res => {
          alert("Đăng ký thành công!")
          navigate("/Login")
        }).catch(err => {
          alert("sập!")
        })


    }
  }
  return (
    <div id='main'>
      <div className='register'>
        <div id='form'>
          <form id='form_content' >
            <h2 className='form_name'>Đăng Ký</h2>
            <input type="text" id='mail' placeholder='email' required />
            <input type="text" id='username' placeholder='username' required />
            <input type="password" id='password' placeholder='password' required />
            <input type="password" id='confirmPass' placeholder='confirm Password' required />
            <button type='submit' onClick={(e) => {
              e.preventDefault();

              if (checkEmail() && checkPass()) {

                handleNewUser();  

              }
              else {
                console.log("false");
              }
            }}>Đăng ký</button>
          </form>
          <div id='avatar'>
            <img src={avatar} alt="" />
            <br />
            <input type="file" onChange={async (e) => {
              if (e.target.files.length != 0) {
                let url = await uploadFileToStorage(e.target.files[0], "avatar")
                console.log("url", url);
                setAvatar(url ? url : null)
              }
            }} />
          </div>
        </div>

      </div>
    </div>
  )
}
