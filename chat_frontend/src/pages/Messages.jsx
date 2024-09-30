import React, { useEffect, useState, useRef, useContext } from "react";
import {Link, useLocation, useParams, useOutletContext, Navigate } from 'react-router-dom'
import { fetchMessages, URL, wsURL } from "../utils/api";
import {  RootLayOutContext } from "../layouts/RootLayout"
import avatar from '../images/avatar.png'
import { formatDate } from '../utils/formatDate'
import { createMessageElement } from "../utils/createElement"
import { updateChatRoom } from "../utils/updateChatRoom"

const url = `${URL}/api/messages/`

function Messages() {
    const [newMessage, setNewMessage] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null)
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const { userAuth, setUserAuth } = useContext(RootLayOutContext)
    const messageRef = useRef()
    const { state } = useLocation()

    const params = `?user=${userAuth?.user}&token=${userAuth?.token}`
    const wsocketURL = state?.community && 
        `${wsURL}/ws/chat/room/${state?.community &&
        state.community}/${params}` ||
        state?.user && `${wsURL}/ws/chat/user/${state?.user && 
        state.user}/${params}`;
    
    function handleSubmit(event) {
        event.preventDefault();
        const communityOrUser = state?.community && {community:state.community} || 
            state?.user && {user:state.user}
        const value = messageRef.current.value;
        const message = value && {message:value}
        message && setNewMessage({
            ...message, 
            ...communityOrUser, 
            respondingTo:responseMessage?.user && 
            responseMessage.user !== userAuth.user ?
            {id:responseMessage.id,user:responseMessage.user} : null
        })
        setResponseMessage(null)
        event.target.reset()
    }

    function handleWebSocket() {
        let ws = new WebSocket(wsocketURL);

        newMessage && ws.addEventListener("open", (event) => {
            console.log("Websocket connection established.");
            ws.send(JSON.stringify(newMessage));
        });

        ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
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
        function scrollElementInToView() {
            const chats = document.querySelector('.chats')
            const element =chats && Array.from(chats.children).slice(-1)[0]
            element && element.scrollIntoView({ 
                behavior: "auto", 
                block: "end", 
                inline: "nearest" 
            });
        }
        scrollElementInToView()
    }, [messages])

    useEffect(()=> {
      async function getMessages() {
            const url = state?.community && `${URL}/api/community/${state.community}` ||
            state?.user && `${URL}/api/user/${state.user}`
            const data = await fetchMessages(url, userAuth.token)
            setMessages(data)
            setIsLoading(false)
       }
       getMessages()
    }, [])

    useEffect(()=> {
        if (responseMessage) {
            createMessageElement(responseMessage)
        }
    }, [responseMessage])

    useEffect(()=> {
        async function updateRoom() {
            const data = await updateChatRoom(
                state, 
                userAuth
            )
            if (data.message) {
                console.log(data.message)
            }
            else {
                console.log(data.error)
            }
        }
        updateRoom()
        handleWebSocket()
    }, [newMessage])

    if (!userAuth) {
        return (
            <Navigate to='/sign-in' />
        )
    }

    if (!state) {
        return (
            <Navigate to='/chat-rooms' />
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
                <div className="chat-message-back-ellipsis-btn">
                    <div className="chat-message-back-btn">
                        <Link 
                            state={{...state}}
                            className="chat-message-redirect-link" 
                            to={`${state?.redirectPath && state.redirectPath}`}
                        >
                            <span className='chat-message-arrow-left'>
                                <i className="fas fa-arrow-left"></i>
                            </span>
                        </Link>
                        <div className='chat-message-profile-container'>
                            <div className='chat-message-profile-img'>
                                {state?.user && <img src={state.avatar_url} alt="" /> ||
                                    state?.community && 
                                    <img src={state.logo_url} alt="community_logo" />
                                }
                            </div>
                            <p className='chat-message-profile-user'>{state?.user && state.user || state?.community && state.community}</p>
                        </div>
                    </div>
                    <button className="chat-message-ellipsis">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                </div>
            </div>
            <div className="chat-box">
                <div className='chats'>
                    {messages &&
                        messages.type ==='community' &&
                            messages.message_list.map((message)=> {
                                return (
                                    <div
                                        key={message.id} 
                                        className={
                                            message.author === userAuth.user ?
                                            'my-message chat-message':
                                            'user-message chat-message'
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
                            })
                        ||
                        messages.type === 'user' &&
                            messages.messages_list.map((message)=> {
                                return (
                                    <React.Fragment key={message.id}>
                                        {message.message && 
                                            <div
                                                key={message.id} 
                                                className='my-message chat-message'
                                            >
                                                <p className='chat'>
                                                    <span>{message.message}</span>
                                                </p>
                                            </div>
                                        }
                                        {message.other_user_message && 
                                            <div className='user-message chat-message'>
                                                <p className='chat'>
                                                    <span>{message.other_user}</span>
                                                    <span>{message.other_user_message}</span>
                                                    <span>{formatDate(message.other_meessage_created)}</span>
                                                </p>
                                            </div>
                                        }
                                    </React.Fragment>
                                )
                            })
                    }
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
