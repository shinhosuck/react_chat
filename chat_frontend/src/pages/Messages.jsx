import React, { useEffect, useState, useRef, useContext } from "react";
import {Link, useLocation, useParams, useOutletContext, Navigate } from 'react-router-dom'
import { fetchCommunityMessages, URL } from "../utils/api";
import {  RootLayOutContext } from "../layouts/RootLayout"
import avatar from '../images/avatar.png'
import { formatDate } from '../utils/formatDate'
import { wsURL } from "../utils/api"
import { createMessageElement } from "../utils/createElement"

const url = `${URL}/api/messages/`

function Messages() {
    const [newMessage, setNewMessage] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null)
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const { userAuth, setUserAuth } = useContext(RootLayOutContext)
    const messageRef = useRef()
    const { state } = useLocation()

    function handleSubmit(event) {
        event.preventDefault();
        const communityOrUser = state?.community && {community:state.community} || 
            state?.user && {user:state.user}
        const value = messageRef.current.value;
        const message = value && {message:value}
        message && setNewMessage({...message, ...communityOrUser})
        event.target.reset()
    }

    function handleWebSocket() {
        const params = `?user=${userAuth?.user}&token=${userAuth?.token}`
        const URL = state?.community && `${wsURL}/ws/chat/room/${state?.community && state.community}/${params}` ||
                    state?.user && `${wsURL}/ws/chat/user/${state?.user && state.user}/${params}`;
        const ws = new WebSocket(URL);
      
        newMessage && ws.addEventListener("open", (event) => {
            console.log("Websocket connection established.");
            ws.send(JSON.stringify(newMessage));
        });

        ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            console.log(data)
            if (data?.message) {
                setResponseMessage(data)
            }
            else if (data.error) {
                // log the user out
                console.log(data.error)
            }
        });

        ws.addEventListener("close", (event)=> {
            console.log("WebSocket connection closed");
        })

        ws.addEventListener("error", (event)=> {
            console.log("WebSocket error:", event.error);
        })
    }

    useEffect(()=> {
      async function getMessages() {
            const url = state?.community && `${URL}/api/community/${state.community}` ||
            state?.user && `${URL}/api/user/${state.user}`
            const data = await fetchCommunityMessages(url)
            setMessages(data)
            setIsLoading(false)
       }
       getMessages()
    }, [])

    useEffect(()=> {
        if (responseMessage) {
            createMessageElement(responseMessage)
            setResponseMessage(null)
        }
    }, [responseMessage])

    useEffect(()=> {
        handleWebSocket()
    }, [newMessage])

    if (!userAuth) {
        return (
            <Navigate to='/sign-in' />
        )
    }

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
                        state?.community && <button><i className="fa-solid fa-city"></i></button>}
                    </div>
                    <p className='chat-message-profile-user'>{state?.user && state.user || state?.community && state.community}</p>
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
