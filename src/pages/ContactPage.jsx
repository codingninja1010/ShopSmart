import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Helmet } from "react-helmet-async";
const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const isFormValid = name && email && message;
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add contact logic here
    alert("Message sent! (Demo only)");
    setName(""); setEmail(""); setMessage("");
  };
  return (
    <>
      <Helmet>
        <title>Contact • ShopSmart</title>
        <meta name="description" content="Get in touch with the ShopSmart team. We’re here to help with your questions and feedback." />
        <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ShopSmart" />
        <meta property="og:title" content="Contact • ShopSmart" />
        <meta property="og:description" content="Get in touch with the ShopSmart team. We’re here to help with your questions and feedback." />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://example.com/contact'} />
        <meta property="og:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact • ShopSmart" />
        <meta name="twitter:description" content="Get in touch with the ShopSmart team. We’re here to help with your questions and feedback." />
        <meta name="twitter:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/contact'} />
      </Helmet>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form my-3">
                <label htmlFor="contactName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactName"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="form my-3">
                <label htmlFor="contactEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="contactEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form  my-3">
                <label htmlFor="contactMessage">Message</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="contactMessage"
                  placeholder="Enter your message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  className="my-2 px-4 mx-auto btn btn-dark"
                  type="submit"
                  disabled={!isFormValid}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
