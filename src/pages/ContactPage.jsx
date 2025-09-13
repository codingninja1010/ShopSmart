import React, { useState } from "react";
import { Footer, Navbar } from "../components";
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
