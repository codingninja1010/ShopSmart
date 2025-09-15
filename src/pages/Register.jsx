import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const isFormValid = name && email && password;
    const handleSubmit = (e) => {
        e.preventDefault();
        // Save user info to localStorage for demo profile (support multiple users)
        let users = JSON.parse(localStorage.getItem('users')) || [];
        // Check if email already exists
        if (users.some(u => u.email === email)) {
            alert('Email already registered!');
            return;
        }
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({ name, email }));
        alert("Registered successfully! (Demo only)");
        window.location.href = '/profile';
    };
    return (
        <>
            <Helmet>
                <title>Register • ShopSmart</title>
                <meta name="robots" content="noindex,nofollow" />
                <meta name="description" content="Create your ShopSmart account to save your cart and access your profile." />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Register • ShopSmart" />
                <meta property="og:description" content="Create your ShopSmart account to save your cart and access your profile." />
                <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://example.com/register'} />
                <meta property="og:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Register • ShopSmart" />
                <meta name="twitter:description" content="Create your ShopSmart account to save your cart and access your profile." />
                <meta name="twitter:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
                <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/register'} />
                                <script type="application/ld+json">
                                    {JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Register • ShopSmart', url: typeof window !== 'undefined' ? window.location.href : 'https://example.com/register', description: 'Create your ShopSmart account to save your cart and access your profile.' })}
                                </script>
                                <script type="application/ld+json">
                                    {JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: typeof window !== 'undefined' ? window.location.origin + '/' : 'https://example.com/' }, { '@type': 'ListItem', position: 2, name: 'Register', item: typeof window !== 'undefined' ? window.location.href : 'https://example.com/register' } ] })}
                                </script>
            </Helmet>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form  my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={!isFormValid}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register