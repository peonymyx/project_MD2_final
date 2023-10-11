import React from 'react'

export default function Carousel() {
  return (
    <div id='main'>
      <div id="carouselExample" className="carousel slide main" style={{
        zIndex: "0",
        width: "100%",
        height: "500px",
        maxWidth:"1440px",
        backgroundColor:"red"

      }}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://www.genshin.shop/cdn/shop/files/11_1944x.png?v=1628698034" className="d-block" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.genshin.shop/cdn/shop/files/8_1944x.png?v=1628629696" className="d-block" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.genshin.shop/cdn/shop/files/5_cb91b3da-f51a-4c03-a99d-ef9468f3f872_1944x.png?v=1664059658" className="d-block" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.genshin.shop/cdn/shop/files/9_ba99fd0a-4cad-43c0-a2f2-ddc1ff81aa38_1944x.png?v=1664059663" className="d-block" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>



  )
}
