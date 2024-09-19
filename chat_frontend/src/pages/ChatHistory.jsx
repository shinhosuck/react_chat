import React, { useState, useEffect } from 'react'
import { useOutletContext, Link, useLocation } from 'react-router-dom'
import avatar from '../images/avatar.png'

function ChatHistory() {
    const [ isLoading, setIsLoading ] = useState(true)
    const { pathname } = useLocation()

    useEffect(()=> {
        setIsLoading(false)
    }, [])

    if (isLoading) {
        return (
            <div
                className='chat-message-container'
                style={{textAlign:'center',color:'white'}}
            >
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="chat-history-container">
            <div className="chat-history">
                <Link 
                    state={{redirect:'Chats',user:'James', redirectPath:pathname}}
                    className="chat-history-link" 
                    to="../chatting/with/james" 
                >
                    <div className="chat-history-profile-img-container">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="chat-history-username-date">
                        <span>James</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </Link>
                <Link
                    state={{redirect:'Chats',user:'greg',redirectPath:pathname}}
                    className="chat-history-link" 
                    to="../chatting/with/greg" 
                >
                    <div className="chat-history-profile-img-container">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="chat-history-username-date">
                        <span>Greg</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </Link>
                <Link
                    state={{redirect:'Chats',user:'dan',redirectPath:pathname}}
                    className="chat-history-link" 
                    to="../chatting/with/dan" 
                >
                    <div className="chat-history-profile-img-container">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="chat-history-username-date">
                        <span>Dan</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </Link>
                <Link
                    state={{redirect:'Chats',user:'matt',redirectPath:pathname}}
                    className="chat-history-link" 
                    to="../chatting/with/matt" 
                >
                    <div className="chat-history-profile-img-container">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="chat-history-username-date">
                        <span>Matt</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </Link>
                <Link
                    state={{redirect:'Chats',user:'smith',redirectPath:pathname}}
                    className="chat-history-link" 
                    to="../chatting/with/smith" 
                >
                    <div className="chat-history-profile-img-container">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="chat-history-username-date">
                        <span>Smith</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </Link>
                <Link
                    state={{redirect:'Chats',user:'olson',redirectPath:pathname}}
                    className="chat-history-link" 
                    to="../chatting/with/olson" 
                >
                    <div className="chat-history-profile-img-container">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="chat-history-username-date">
                        <span>Olson</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ChatHistory