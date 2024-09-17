import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function People() {
    const { pathname, state } = useLocation()

    // console.log(state)

    return (
        <div className='people-container'>
            <Link
                className={state?.user && 
                    state.user === 'jack' && 
                    'people-link active-chat-room' || 
                    'people-link'}
                to='../../chatting/with/jack'
                state={{redirect:'People', user:'jack', redirectPath:pathname}}
            >
                <span>Jack</span>
                <span>online</span>
            </Link>
            <Link
                className={state?.user && 
                    state.user === 'smith' && 
                    'people-link active-chat-room' || 
                    'people-link'}
                to='../../chatting/with/smith'
                state={{redirect:'People', user:'smith', redirectPath:pathname}}
            >
                <span>Smith</span>
                <span>online</span>
            </Link>
            <Link
                className={state?.user && 
                    state.user === 'greg' && 
                    'people-link active-chat-room' || 
                    'people-link'}
                to='../../chatting/with/greg'
                state={{redirect:'People', user:'greg', redirectPath:pathname}}
            >
                <span>Greg</span>
                <span>online</span>
            </Link>
            <Link
                className={state?.user && 
                    state.user === 'matt' && 
                    'people-link active-chat-room' || 
                    'people-link'}
                to='../../chatting/with/matt'
                state={{redirect:'People', user:'matt', redirectPath:pathname}}
            >
                <span>Matt</span>
                <span>online</span>
            </Link>
            <Link
                className={state?.user && 
                    state.user === 'dave' && 
                    'people-link active-chat-room' || 
                    'people-link'}
                to='../../chatting/with/dave'
                state={{redirect:'People', user:'dave', redirectPath:pathname}}
            >
                <span>Dave</span>
                <span>online</span>
            </Link>
        </div>
    )
}
export default People

