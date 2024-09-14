import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useParams, useOutletContext } from 'react-router-dom'
import { fetchMessages, URL } from "../utils/api";
import {  RootLayOutContext } from "../layouts/RootLayout"
import { v4 as uuid4 } from 'uuid'

const url = `${URL}/api/messages/`

function Messages() {
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const { userAuth, setUserAuth } = useContext(RootLayOutContext)
    const {setChatType, setChatMessage} = useOutletContext()
    const messageRef = useRef()
    const { state } = useLocation()

    function handleSubmit(event) {
        event.preventDefault();
        const newMessage = messageRef.current.value;
        const message = newMessage && {message:newMessage}
        message && setChatMessage(message);
    }

    async function getMessagesData() {
        const messageObjs = await fetchMessages(url);
        setMessages(messageObjs)
        setIsLoading(false)
    }

    useEffect(() => {
        getMessagesData();
        state?.type && setChatType(state);
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
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
    )
}

export default Messages;
