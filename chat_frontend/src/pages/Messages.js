import React, { useEffect, useState, useRef, useContext } from "react";
import {Link, useLocation, useParams, useOutletContext } from 'react-router-dom'
import { fetchMessages, URL } from "../utils/api";
import {  RootLayOutContext } from "../layouts/RootLayout"
import { v4 as uuid4 } from 'uuid'

const url = `${URL}/api/messages/`

function Messages() {
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const { userAuth, setUserAuth } = useContext(RootLayOutContext)
    const messageRef = useRef()
    const { state } = useLocation()

    console.log(state)

    function handleSubmit(event) {
        event.preventDefault();
        const newMessage = messageRef.current.value;
        const message = newMessage && {message:newMessage}
    }

    async function getMessagesData() {
        const messageObjs = await fetchMessages(url);
        setMessages(messageObjs)
        setIsLoading(false)
    }

    useEffect(() => {
        getMessagesData();
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <Link to={`${state?.redirectPath && state.redirectPath}`}>
                <span>&#8592;</span>
                <span>Back to {state?.redirect && state.redirect}</span>
            </Link>
            <div className="chat-box">
                <div className='chats'>
                    {messages?.map((message)=> {
                        return (
                            <div
                                key={message.id} 
                                className={
                                    message.author === userAuth.user?
                                    'my-message chat-message':'user-message chat-message'
                                }
                            >
                                <p>{message.message}</p>
                            </div>
                        )
                    })}
                    <div className='user-message chat-message'>
                        <p>new message</p>
                    </div>
                    <div className='user-message chat-message'>
                        <p>new message</p>
                    </div>
                    <div className='user-message chat-message'>
                        <p>new message</p>
                    </div>
                    <div className='user-message chat-message'>
                        <p>new message</p>
                    </div>
                    <div className='user-message chat-message'>
                        <p>new message</p>
                    </div>
                    <div className='user-message chat-message'>
                        <p>new message</p>
                    </div>
                    <div className='user-message chat-message'>
                        <p>new message</p>
                    </div>
                </div>
                <form className='message-form' onSubmit={handleSubmit}>
                    <input type="text" name='message' autoFocus={true} ref={messageRef} placeholder="What's on your mind?"/>
                    <button type="submit">
                        <i className="fa-solid fa-arrow-up"></i>
                    </button>
                </form>
            </div>
        </>
    )
}

export default Messages;
