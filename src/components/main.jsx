import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero pb-3">
        <div className="card border-0 mx-3 shadow-lg rounded-xl overflow-hidden position-relative">
          <img
            className="card-img img-fluid w-100"
            src="./assets/main.png.jpg"
            alt="ShopSmart Hero"
            style={{ maxHeight: 500, objectFit: 'cover', filter: 'brightness(0.7)' }}
          />
          <div className="card-img-overlay d-flex align-items-center justify-content-center p-0">
            <div className="container text-center">
              <h1 className="card-title display-3 fw-bold mb-3" style={{ letterSpacing: '2px' }}>
                Welcome to <span style={{ color: 'var(--primary)' }}>ShopSmart</span>
              </h1>
              <p className="card-text fs-4 mb-4 d-none d-md-block">
                Discover the latest trends, exclusive deals, and a seamless shopping experience.<br/>
                Shop smarter, live better.
              </p>
              <a href="/product" className="btn btn-primary btn-lg shadow rounded-xl px-4 py-2">
                Shop Now <i className="fa fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
