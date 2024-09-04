/* eslint-disable no-unused-vars */

import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar-container">
            <Link to="." className="navbar-logo">
                <h2>DjangoChat</h2>
            </Link>
            <div className="navlinks">
                <NavLink className="navlink" to=".">
                    Home
                </NavLink>
                <NavLink className="navlink" to="">
                    Sign in
                </NavLink>
                <NavLink className="navlink" to="">
                    Sign out
                </NavLink>
                <NavLink className="navlink" to="">
                    Register
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
