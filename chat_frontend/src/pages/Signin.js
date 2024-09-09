import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate, useLocation, useOutletContext, Navigate } from 'react-router-dom'
import { URL, userLogin } from '../utils/api'
import { RootLayOutContext } from '../layouts/RootLayout'

const url = `${URL}/api/auth/login/`

function Signin() {
    const { setUserAuth, userAuth } = useContext(RootLayOutContext)
    const [user, setUser] = useState({username:'', password:''})
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const focusRef = useRef()
    const navigate = useNavigate()
    const { state } = useLocation()

    async function handleSubmit(event) {
        event.preventDefault()
        if (user.username && user.password) {
            const data = await userLogin(url, user)
            if (data.error) {
                setError(data)
            }else {
                setUserAuth(data)
                window.localStorage.setItem('user', JSON.stringify(data))
                navigate('/chat-room', {state:{message:data.message}})
            }
        }
    }

    function handleChange(event) {
        const {name, value} = event.target 
        setUser((prev)=> ({...prev, [name]:value}))
    }

    useEffect(()=> {
        focusRef.current?.focus()
        setIsLoading(false)
    }, [])

    
    if (userAuth) {
        return (
            <Navigate to='/chat-room' state={{'error':'You are signed in already.'}} />
        )
    }

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className="sign-in-container">
            {state?.message && <p className="message">{state.message}</p>}
            <h1 className="sign-in-form-header">Sign in</h1>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <div className="sign-in-form-row">
                    {error && <p className='error'>{error.error}</p>}
                    <label className="sign-in-form-label" htmlFor="username">Username</label>
                    <input
                        onChange={handleChange}
                        className="sign-in-form-input" 
                        id="username" 
                        name="username" 
                        value={user.username.replaceAll(' ', '').trim()} 
                        type="text"
                        ref={focusRef} 
                    />
                </div>
                <div className="sign-in-form-row">
                    <label className="sign-in-form-label" htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        className="sign-in-form-input" 
                        id="password" 
                        name="password" 
                        value={user.password} 
                        type="password" 
                    />
                </div>
                <button type="submit" disabled={error || !user.username || !user.password} className="sign-in-form-sign-in">Sign in</button>
                <div className="sign-in-form-sign-in-btn">
                    <span>Don't have an account?</span>
                    <Link to="/sign-in">Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default Signin