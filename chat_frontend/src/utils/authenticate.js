
import { validateUsernameEmail, URL } from './api'

const url = `${URL}/api/auth/validate/`

export async function validateRegisterForm(user) {
    const passwordConfirmation = user.passwordConfirmation;
    const password = user.password 

    const pattern = "^[a-zA-Z0-9_-]*$"
    const regex = new RegExp(pattern)
    const is_valid = regex.test(user.username)

    const errors = {
        emptyFields: [],
        invalidUserName: null,
        passwordTooShort: null,
        passwordMismatch: null,
        user_exists: null
    }

    for (const key in user) {
        if (!user[key]) {
            errors.emptyFields.push(key)
        }
    }
    if (user.username) {
        if (!is_valid) {
            errors.invalidUserName = 'Invalid username.'
        }
    }
    if (user.password && user.password.length < 8) {
        errors.passwordTooShort = 'Password must be a least 8 characters.'
    }
    if (password && passwordConfirmation && password !== passwordConfirmation) {
        errors.passwordMismatch = 'Passwords did not match.'
    }

    const errorObj = {}

    for (const key in errors){
        if (key === 'emptyFields') {
            if (errors.emptyFields.length) {
                errorObj.emptyFields = errors[key]
            }
        }
        else {
            if (errors[key]) {
                errorObj[key] = errors[key]
            }
        }
    }

    if (!Object.keys(errorObj).length) {
        const body = {username:user.username, email:user.email}
        const data = await validateUsernameEmail(url, body)
        if (data.user_exists) {
            errorObj.user_exists = data.user_exists
        }
    }

    return Object.keys(errorObj).length ? errorObj: {message:'valid'}
}
    

