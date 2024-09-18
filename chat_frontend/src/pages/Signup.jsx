import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { userRegister, URL } from "../utils/api";
import { validateAuthForm } from "../utils/authenticate";

const url = `${URL}/api/auth/register/`;

function Signup() {
    const [formError, setFormError] = useState(null)
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });
    const navigate = useNavigate();
    const { state } = useLocation()

    async function handleSubmit(event) {
        event.preventDefault();
        const resp = await validateAuthForm('register', user);

        if (resp?.message === 'valid') {
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
                setFormError(null)
                navigate("/sign-in", { state: { message: data.message } });
            }
        }else {
           const id = setTimeout(() => {
                setFormError(resp)
                clearTimeout(id)
           }, 100);
        }
    }

    function handleChange(event) {
        const emptyFields = formError?.emptyFields
        const { name, value } = event.target;

        if (emptyFields && emptyFields.includes(name)) {
            const index = emptyFields.indexOf(name)
            emptyFields.splice(index, 1)
            if (!emptyFields.length) {
                setFormError(null)
            }
        }
        setUser((prev) => ({ ...prev, [name]: value }));
    }

    useEffect(()=> {
        document.title = 'Sign Up'
    }, [state])

    return (
        <div className="signup-form-container">
            {state?.message && <p className="message">{state.message}</p>}
            {state?.error && <p className="error">{state.error}</p>}
            <h1 className="signup-form-header">Sign up for DjangoChat</h1>    
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-form-row">
                    <label className="signup-form-label" htmlFor="username">
                        Username
                    </label>
                    {formError &&
                        <ul className="form-error">
                            {(formError ?.emptyFields ?.includes('username') && 
                                <li>This field can't be blank.</li>
                            )}
                            {(formError ?.invalidUserName && 
                                <li>{formError.invalidUserName}</li>
                            )}
                            {(formError ?.user_exists ?.user && 
                                <li>{formError.user_exists.user}</li>
                            )}
                            {(formError ?.username && 
                                <li>{formError.username}</li>
                            )}
                        </ul>
                    }
                    <input
                        onChange={handleChange}
                        className="signup-form-input"
                        type="text"
                        id="username"
                        name="username"
                        value={user.username.replaceAll(' ', '').trim()}
                        autoFocus={true}
                    />
                    <ul className="helper-text">
                        <li>Username may include letters, numbers, and a single hyphen or underscore.</li>
                    </ul>
                </div>
                <div className="signup-form-row">
                    <label className="signup-form-label" htmlFor="email">
                        Email
                    </label>
                    {formError &&
                        <ul className="form-error">
                            {(formError ?.emptyFields ?.includes('email')&& 
                                <li>This field can't be blank.</li>
                            )}
                            {(formError ?.user_exists ?.email && 
                                <li>{formError.user_exists.email}</li>
                            )}
                        </ul>
                    }
                    <input
                        onChange={handleChange}
                        className="signup-form-input"
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                    />
                    <ul className="helper-text">
                        <li>Ensure that your email is valid, as it will be used for password resets, notifications, and other communications.</li>
                    </ul>
                </div>
                <div className="signup-form-row">
                    <label className="signup-form-label" htmlFor="password">
                        Password
                    </label>
                    {formError &&
                        <ul className="form-error">
                            {(formError ?.emptyFields ?.includes('password')&& 
                                <li>This field can't be blank.</li>
                            )}
                            {(formError ?.passwordTooShort && 
                                <li>{formError.passwordTooShort}</li>
                            )}
                            {(formError ?.passwordMismatch && 
                                <li>{formError.passwordMismatch}</li>
                            )}
                        </ul>
                    }
                    <input
                        onChange={handleChange}
                        className="signup-form-input"
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                    />
                    <ul className="helper-text">
                        <li>Password must be at least 8 characters in length.</li>
                    </ul>
                </div>
                <div className="signup-form-row">
                    <label
                        className="signup-form-label"
                        htmlFor="passwordConfirmation"
                    >
                        Password confirmation
                    </label>
                    {formError &&
                        <ul className="form-error">
                            {(formError ?. emptyFields ?.includes('passwordConfirmation')&& 
                                <li>This field can't be blank.</li>
                            )}
                        </ul>
                    }
                    <input
                        onChange={handleChange}
                        className="signup-form-input"
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        value={user.passwordConfirmation}
                    />
                    <ul className="helper-text">
                        <li>Re-enter the password you just provided</li>
                    </ul>
                </div>
                <button 
                    className="signup-submit-btn" 
                    type="submit" 
                    disabled={formError?.emptyFields}
                >
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