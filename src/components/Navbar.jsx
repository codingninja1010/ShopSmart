import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../index';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const state = useSelector(state => state.handleCart)
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-lg py-3 sticky-top shadow-lg">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">ShopSmart</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
                        {!isLoggedIn ? (
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark m-1"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-1"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/profile" className="btn btn-outline-dark m-1"><i className="fa fa-user mr-1"></i> Profile</NavLink>
                                <button className="btn btn-outline-dark m-1" onClick={handleLogout}><i className="fa fa-sign-out mr-1"></i> Logout</button>
                            </>
                        )}
                        <NavLink to="/cart" className="btn btn-outline-dark m-1"><i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})</NavLink>
                        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
                            {theme === "dark" ? <i className="fa fa-sun-o"></i> : <i className="fa fa-moon-o"></i>}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar