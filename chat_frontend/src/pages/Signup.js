import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userRegister, URL } from "../utils/api";
import { validateRegisterForm } from "../utils/authenticate";

const url = `${URL}/api/auth/register/`;

function Signup() {
    const [formError, setFormError] = useState(null)
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });
    const focusRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const resp = await validateRegisterForm(user);
        if (resp && resp.message === 'valid') {
            setFormError(null)
            const data = await userRegister(url, user);
            if (data.error) {
                setFormError(data)
            }else {
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    passwordConfirmation: "",
                });
                console.log(data.message)
                navigate("/sign-in", { state: { message: data.message } });
            }
        }else {
            setFormError(resp)
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        focusRef.current.focus();
    }, []);

    return (
        <div className="signup-form-container">
            <h1 className="signup-form-header">Sign up for DjangoChat</h1>    
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-form-row">
                    <label className="signup-form-label" htmlFor="username">
                        Username
                    </label>
                    {(formError ?.emptyFields ?.includes('username') && 
                        <p className="error">This field can't be blank.</p>
                    )}
                    {(formError ?.invalidUserName && 
                        <p className="error">{formError.invalidUserName}</p>
                    )}
                    {(formError ?.user_exists ?.user && 
                        <p className="error">{formError.user_exists.user}</p>
                    )}
                    {(formError ?.username && 
                        <p className="error">{formError.username}</p>
                    )}
                    <input
                        onChange={handleChange}
                        className="signup-form-input"
                        type="text"
                        id="username"
                        name="username"
                        ref={focusRef}
                        value={user.username.replaceAll(' ', '').trim()}
                    />
                </div>
                <div className="signup-form-row">
                    <label className="signup-form-label" htmlFor="email">
                        Email
                    </label>
                    {(formError ?.emptyFields ?.includes('email')&& 
                        <p className="error">This field can't be blank.</p>
                    )}
                    {(formError ?.user_exists ?.email && 
                        <p className="error">{formError.user_exists.email}</p>
                    )}
                    <input
                        onChange={handleChange}
                        className="signup-form-input"
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                    />
                </div>
                <div className="signup-form-row">
                    <label className="signup-form-label" htmlFor="password">
                        Password
                    </label>
                    {(formError ?.emptyFields ?.includes('password')&& 
                        <p className="error">This field can't be blank.</p>
                    )}
                    {(formError ?.passwordTooShort && 
                        <p className="error">{formError.passwordTooShort}</p>
                    )}
                    {(formError ?.passwordMismatch && 
                        <p className="error">{formError.passwordMismatch}</p>
                    )}
                    <input
                        onChange={handleChange}
                        className="signup-form-input"
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                    />
                </div>
                <div className="signup-form-row">
                    <label
                        className="signup-form-label"
                        htmlFor="passwordConfirmation"
                    >
                        Password confirmation
                    </label>
                    {(formError ?. emptyFields ?.includes('passwordConfirmation')&& 
                        <p className="error">This field can't be blank.</p>
                    )}
                    <input
                        onChange={handleChange}
                        className="signup-form-input"
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        value={user.passwordConfirmation}
                    />
                </div>
                <button className="signup-submit-btn" type="submit">
                    Sign up
                </button>
                <div className="signup-form-sign-up-btn">
                    <span>Already have an account?</span>
                    <Link to="/sign-in">Sign in</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup