import { 
    Link, 
    useNavigate, 
    useLocation, 
    useOutletContext, 
    Navigate 
} from 'react-router-dom'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { URL, userLogin } from '../utils/api'
import { RootLayOutContext } from '../layouts/RootLayout'
import { validateAuthForm } from "../utils/authenticate";
import { updateChatSession } from '../utils/updateChatRoom'

const url = `${URL}/api/auth/login/`

function Signin() {
    const { setUserAuth, userAuth } = useContext(RootLayOutContext)
    const [errorOrMessage, setErrorOrMessage] = useState(null)
    const [backendError, setBackendError] = useState(null)
    const [formError, setFormError] = useState(null)
    const [user, setUser] = useState({username:'', password:''})
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const { state } = useLocation()
    
    async function handleSubmit(event) {
        event.preventDefault()
        const resp = await validateAuthForm('login',user)

        if (resp?.message === 'valid') {
            const data = await userLogin(url, user)
            if (data.error) {
                setBackendError(data)
            }
            else {
                const update = await updateChatSession({
                    username:data.user,
                    token:data.token
                })
                if (update?.error) {
                   setErrorOrMessage(update)
                }
                else {
                    setUserAuth(data)
                    sessionStorage.setItem('user', JSON.stringify(data))
                    navigate(
                        '/chat-rooms', 
                        {replace:true, 
                        state:{message:data.message}}
                    )
                }
            }
        }
        else {
            const id = setTimeout(() => {
                setFormError(resp)
                clearTimeout(id)
            }, 100);
        }
    }

    function handleChange(event) {
        const {name, value} = event.target 
        const emptyFields = formError?.emptyFields

        if (emptyFields?.includes(name)) {
            if (!emptyFields.length) {
                setFormError(null)
            }
            const index = emptyFields.indexOf(name)
            emptyFields.splice(index, 1)
        }
        
        if (backendError && 'error' in backendError) {
            const username = user.username !== backendError.username 
            const password = user.password !== backendError.password
            username && password && setBackendError(null)
        }
        setUser((prev)=> ({...prev, [name]:value}))
    }

    useEffect(()=> {
        setIsLoading(false)
        document.title = 'Sign In'
        window.history.replaceState(
            {state: null}, '', '/sign-in'
        )
    }, [])

    useEffect(()=> {
        if (state) {
            setErrorOrMessage(state)
        }
        const id = setTimeout(() => {
            setErrorOrMessage(null)
            clearTimeout(id)
        }, 5000);
    }, [])

    if (userAuth) {
        console.log(userAuth)
        return (
            <Navigate 
                to='/chat-rooms' 
                replace={true} state={{error:'You are signed in already.'}} 
            />
        )
    }

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }
   
    return (
        <div className="sign-in-container">
            {errorOrMessage?.message && 
                <div onClick={()=>setErrorOrMessage(null)} className="message-row show-message-row">
                    <div className="message-container">
                        <p className="message">{errorOrMessage.message}</p>
                        <button className="message-close-btn">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            }
            {errorOrMessage?.error && 
                <div onClick={()=>setErrorOrMessage(null)} className="error-row show-error-row">
                   <div className="error-container">
                        <p className="error">{errorOrMessage.error}</p>
                        <button className="error-close-btn">
                            <i className="fas fa-times"></i>
                        </button>
                   </div>
                </div>
            }
            <h1 className="sign-in-form-header">Sign in</h1>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <div className="sign-in-form-row">
                    <ul className='form-error'>
                         {backendError && <li>{backendError.error}</li>}
                    </ul>
                    <label className="sign-in-form-label" htmlFor="username">Username</label>
                     <ul className="form-error">
                        {(formError ?.emptyFields ?.includes('username') && 
                            <li>This field can't be blank.</li>
                        )}
                        {(formError ?.invalidUserName && 
                            <li>{formError.invalidUserName}</li>
                        )}
                    </ul>
                    <input
                        onChange={handleChange}
                        className="sign-in-form-input" 
                        id="username" 
                        name="username" 
                        value={user.username.replaceAll(' ', '').trim()} 
                        type="text"
                        autoFocus={true}
                    />
                </div>
                <div className="sign-in-form-row">
                    <label className="sign-in-form-label" htmlFor="password">Password</label>
                    <ul className="form-error">
                        {(formError ?.emptyFields ?.includes('password')&& 
                            <li>This field can't be blank.</li>
                        )}
                    </ul>
                    <input
                        onChange={handleChange}
                        className="sign-in-form-input" 
                        id="password" 
                        name="password" 
                        value={user.password} 
                        type="password" 
                    />
                </div>
                <button type="submit" disabled={backendError || formError} className="sign-in-form-sign-in">Sign in</button>
                <div className="sign-in-form-sign-in-btn">
                    <span>Don't have an account?</span>
                    <Link to="/sign-up">Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default Signin