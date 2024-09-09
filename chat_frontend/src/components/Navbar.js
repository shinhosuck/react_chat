
import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { RootLayOutContext } from '../layouts/RootLayout'


function Navbar({setUser}) {
    const { setUserAuth, userAuth } = useContext(RootLayOutContext)
    const navigate = useNavigate()

    function handleSignOut(event) {
        event.preventDefault()
        setUserAuth(null)
        localStorage.removeItem('user')
        navigate('/sign-in', {state:{message:'Successfully signed out.'}})
    }

    return (
        <nav className="navbar-container">
            <Link to="." className="navbar-logo">
                <h2>DjangoChat</h2>
            </Link>
            <div className="navlinks">
                <NavLink className="navlink" to=".">
                    Home
                </NavLink>
                {userAuth ?
                        <button type="button" onClick={handleSignOut} className="navlink sign-out-btn">
                            Sign out
                        </button>
                    :
                    <>
                        <NavLink className="navlink" to="sign-in">
                            Sign in
                        </NavLink>
                        <NavLink className="navlink" to="sign-up">
                            Sign up
                        </NavLink>
                    </>
                }
            </div>
        </nav>
    );
}

export default Navbar;
