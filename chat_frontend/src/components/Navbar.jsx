
import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { RootLayOutContext } from '../layouts/RootLayout'


function Navbar({setUser}) {
    const [toggleNavLink, setToggleNavLinks] = useState(false)
    const { setUserAuth, userAuth } = useContext(RootLayOutContext)
    const navigate = useNavigate()

    function handleSignOut(event) {
        event.preventDefault()
        setUserAuth(null)
        setToggleNavLinks(false)
        sessionStorage.removeItem('user')
        navigate('/sign-in', {state:{message:'Successfully signed out.'}})
    }

    return (
        <>
            {/* Mobile Navbar */}
                <nav className="mobile-navbar-container">
                    <Link to="." className="mobile-navbar-logo">
                        <h2>DjangoChat</h2>
                    </Link>
                    <div className="mobile-navlinks-toggle-btns">
                        {!toggleNavLink ?
                            <button onClick={()=>setToggleNavLinks(true)} type="button">
                                <i className="fa-solid fa-bars"></i>
                            </button>
                        :
                            <button onClick={()=>setToggleNavLinks(false)} type="button">
                                <i className="fas fa-times"></i>
                            </button>
                        }
                    </div>
                    <div className={toggleNavLink?
                        'mobile-navlinks show-mobile-navlinks':'mobile-navlinks'}
                    >
                        {userAuth ?
                            <>
                                <NavLink 
                                    onClick={()=> setToggleNavLinks(false)} 
                                    to="chat-rooms" 
                                    className={({isActive})=>isActive?
                                    'active-mobile-link mobile-nav-link'
                                    :'mobile-nav-link'}
                                >
                                    Chat rooms
                                </NavLink>
                                <button 
                                    onClick={handleSignOut} 
                                    className="sign-out-btn"
                                >
                                    Sign out
                                </button>
                            </>
                        :
                            <>
                                <NavLink
                                    to="." 
                                    onClick={()=> setToggleNavLinks(false)} 
                                    className={({isActive})=>isActive?
                                        'active-mobile-link mobile-nav-link'
                                        :'mobile-nav-link'}
                                >
                                    Home
                                </NavLink>
                                <NavLink 
                                    onClick={()=> setToggleNavLinks(false)} 
                                    to="sign-in" className={({isActive})=>isActive?
                                    'active-mobile-link mobile-nav-link'
                                    :'mobile-nav-link'}
                                >
                                    Sign in
                                </NavLink>
                                <NavLink 
                                    onClick={()=> setToggleNavLinks(false)} 
                                    to="sign-up" 
                                    className='mobile-nav-link mobile-sign-up-btn'
                                >
                                    Sign up
                                </NavLink>
                            </>
                        }
                    </div>
                </nav>
            {/* End */}

            {/* Desktop Navbar */}
                <nav className="navbar-container">
                    <Link to="." className="navbar-logo">
                        <h2>DjangoChat</h2>
                    </Link>
                    <div className="navlinks">
                        {userAuth ?
                            <>
                                <NavLink 
                                    to="chat-rooms" 
                                    className={({isActive})=>isActive?
                                    'active-link navlink':'navlink'}
                                >
                                    Chat rooms
                                </NavLink>
                                <button 
                                    type="button" 
                                    onClick={handleSignOut} 
                                    className="navlink sign-out-btn"
                                >
                                    Sign out
                                </button>
                            </>
                            :
                            <>
                                <NavLink 
                                    className={({isActive})=>isActive?
                                    'active-link navlink':'navlink'} 
                                    to="."
                                >
                                    Home
                                </NavLink>
                                <NavLink className={
                                    ({isActive})=>isActive?
                                    'active-link navlink':'navlink'} 
                                    to="sign-in"
                                >
                                    Sign in
                                </NavLink>
                                <NavLink className='navlink sign-up-btn' to="sign-up">
                                    Sign up
                                </NavLink>
                            </>
                        }
                    </div>
                </nav>
            {/* End */}
        </>
    );
}

export default Navbar;
