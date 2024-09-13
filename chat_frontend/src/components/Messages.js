import React, { useEffect, useState, useRef, useContext } from "react";
import { fetchMessages, URL } from "../utils/api";
import {  RootLayOutContext } from "../layouts/RootLayout"
import { v4 as uuid4 } from 'uuid'

const url = `${URL}/api/messages/`

function Messages({setChatMessage, setNewMessageID}) {
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const { userAuth, setUserAuth } = useContext(RootLayOutContext)
    const messageRef = useRef()

    function handleSubmit(event) {
        event.preventDefault();
        const newMessage = messageRef.current.value;
        const message = newMessage && {id:uuid4(), message:newMessage, token:userAuth.token }
        setChatMessage(message);
        setNewMessageID(message.id)
    }

    async function getMessages() {
        const messageObjs = await fetchMessages(url);
        setMessages(messageObjs)
        setIsLoading(false)
    }

    useEffect(() => {
        getMessages();
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
            </div>
            <form className='message-form' onSubmit={handleSubmit}>
                <input type="text" name='message' autoFocus={true} ref={messageRef}/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Messages;
