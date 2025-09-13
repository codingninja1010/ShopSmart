import React from "react";

const Footer = () => {
  return (
    <>
  <footer className="mb-0 text-center footer-bg">
  <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0 footer-text">Made with ❤️ by {" "}
              <a  href="https://sahibsingh.dev" className="text-decoration-underline footer-link fs-5" target="_blank" rel="noopener noreferrer">Rakesh Vajrapu</a>
            </p>
            <a className="footer-link fs-4" href="https://github.com/rakesh-vajrapu" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
