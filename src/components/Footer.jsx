import React from 'react'

export default function Footer() {
  return (
    <div id='footer'>
      <div className='footer_content'>
        <div className='left_content'>
          <span>Instagram</span>
          <span>FAQ</span>
          <span>Blog</span>
          <span>Privacy Policy</span>
        </div>
        <div className='mid_content'>
          <span>Return Policy</span>
          <span>Terms of Service</span>
          <span>Shipping Policy</span>
        </div>
        <div className='right_content'>
          <span><i className="fa-brands fa-facebook-f"></i>   Facebook</span>
          <span><i className="fa-brands fa-pinterest-p"></i>    Pinterest</span>
          <span><i className="fa-brands fa-instagram"></i>    Instagram</span>
          <span>© 2023, WibuGame.shop</span>
        </div>
        
      </div>
    </div>
  )
}
