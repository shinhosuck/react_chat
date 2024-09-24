import React, { useContext, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { RootLayOutContext } from '../layouts/RootLayout'


function Home() {
    const  { userAuth, setUserAuth } = useContext(RootLayOutContext)

    useEffect(()=> {
        document.title = "Home"
    }, [])

    if (userAuth) {
        return (
            <Navigate to='/chat-rooms' />
        )
    }

    return (
        <div className="home-container">
            <div className="hero-text-container">
                <h1 className="hero-header">Welcome to DjangoChat</h1>
                <p className="hero-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum molestiae alias, vel beatae porro sapiente
                    veniam. Modi nam in, tenetur necessitatibus ex obcaecati rem
                    voluptatum ad pariatur placeat vitae neque?
                </p>
                <Link to="sign-up" className="home-sign-up-btn">Sign up for DjagnoChat</Link>
            </div>
       
        </div>
    );
}

export default Home;
