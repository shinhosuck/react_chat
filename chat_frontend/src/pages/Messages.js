import React, { useEffect, useState, useRef, useContext } from "react";
import {Link, useLocation, useParams, useOutletContext } from 'react-router-dom'
import { fetchMessages, URL } from "../utils/api";
import {  RootLayOutContext } from "../layouts/RootLayout"
import avatar from '../images/avatar.png'
import { formatDate } from '../utils/formatDate'
import { wsURL } from "../utils/api"
import { createMessageElement } from "../utils/createElement"

const url = `${URL}/api/messages/`

function Messages() {
    const [newMessage, setNewMessage] = useState({
        message:'', roomName:'', user:''
    });
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const { userAuth, setUserAuth } = useContext(RootLayOutContext)
    const messageRef = useRef()
    const { state } = useLocation()

    console.log(state)

    function handleSubmit(event) {
        event.preventDefault();
        const chatRoomOrUser = state?.name && {roomName:state.name} || 
            state?.user && {user:state.user}
        const value = messageRef.current.value;
        const message = value && {message:value}
        setNewMessage({...message, ...chatRoomOrUser})
    }

    function handleWebSocket() {
        const params = `?user=${userAuth?.user}&token=${userAuth?.token}`
        const URL = state?.name && `${wsURL}/ws/chat/room/${state?.name && state.name}/${params}` ||
                    state?.user && `${wsURL}/ws/chat/user/${state?.name && state.user}/${params}`;
        const ws = new WebSocket(URL);

        ws.addEventListener("open", (event) => {
            console.log("Websocket connection established.");
            ws.send(JSON.stringify(newMessage));
        });

        ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            console.log(data)
            if (data?.message) {
               createMessageElement(data)
               console.log(data)
            }
            else if (data.error) {
                console.log(data.error)
            }
        });

        ws.addEventListener("close", (event)=> {
            console.log("WebSocket connection closed");
            console.log(event)
        })

        ws.addEventListener("error", (event)=> {
            console.error("WebSocket error:", event.error);
        })
    }

    useEffect(()=> {
        handleWebSocket()
    }, [newMessage])

    useEffect(() => {
        state?.messages && setMessages(state.messages)
        setIsLoading(false)
    }, []);

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
        <div className='chat-message-container'>
            <div className='chat-message-row'>
                <Link 
                    state={{...state}}
                    className="chat-message-redirect-link" 
                    to={`${state?.redirectPath && state.redirectPath}`}
                >
                    <span className='chat-message-arrow-left'>
                        <i className="fas fa-arrow-left"></i>
                    </span>
                    <span>{state?.redirect && state.redirect}</span>
                </Link>
                <div className='chat-message-profile-container'>
                    <div className='chat-message-profile-img'>
                        {state?.user && <img src={avatar} alt="" /> ||
                        state?.name && <button><i className="fa-solid fa-city"></i></button>}
                    </div>
                    <p className='chat-message-profile-user'>{state?.user && state.user || state?.name && state.name}</p>
                </div>
            </div>
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
                                <p className='chat'>
                                    {message.author !== userAuth.user
                                        && <span>{message.author}</span>}
                                    <span>{message.message}</span>
                                    {message.author !== userAuth.user
                                        && <span>{formatDate(message.created)}</span>}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <form className='message-form' onSubmit={handleSubmit}>
                    <input type="text" name='message' autoFocus={true} ref={messageRef} placeholder="What's on your mind?"/>
                    <button type="submit">
                        <i className="fa-solid fa-arrow-up"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Messages;
