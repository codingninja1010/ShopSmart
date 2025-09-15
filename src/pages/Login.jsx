import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isFormValid = email && password;
  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo login: check all users in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
      window.location.href = '/profile';
    } else {
      alert('Invalid credentials!');
    }
  };
  return (
    <>
      <Helmet>
        <title>Login • ShopSmart</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Sign in to your ShopSmart account to view your profile and checkout." />
        <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ShopSmart" />
        <meta property="og:title" content="Login • ShopSmart" />
        <meta property="og:description" content="Sign in to your ShopSmart account to view your profile and checkout." />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://example.com/login'} />
        <meta property="og:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login • ShopSmart" />
        <meta name="twitter:description" content="Sign in to your ShopSmart account to view your profile and checkout." />
        <meta name="twitter:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/login'} />
      </Helmet>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="my-3">
                <label htmlFor="loginEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="loginEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="loginPassword"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={!isFormValid}>
                  Login
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

export default Login;
