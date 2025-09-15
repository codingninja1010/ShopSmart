import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center footer-bg" role="contentinfo">
        <nav aria-label="Footer navigation" className="py-4">
          <ul className="list-inline m-0">
            <li className="list-inline-item mx-2"><a className="footer-link" href="/">Home</a></li>
            <li className="list-inline-item mx-2"><a className="footer-link" href="/product">Products</a></li>
            <li className="list-inline-item mx-2"><a className="footer-link" href="/about">About</a></li>
            <li className="list-inline-item mx-2"><a className="footer-link" href="/contact">Contact</a></li>
            <li className="list-inline-item mx-2"><a className="footer-link" href="/sitemap.xml" rel="sitemap">Sitemap</a></li>
          </ul>
        </nav>
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0 footer-text">Made with ❤️ by {" "}
              <span className="fs-5">Rakesh Vajrapu</span>
            </p>
            <a className="footer-link fs-4" href="https://github.com/rakesh-vajrapu" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
