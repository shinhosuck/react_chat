
import React, { useEffect, useState, useContext } from "react";
import { 
    useLocation, 
    Navigate,
    Outlet,
    NavLink
} from "react-router-dom";
import { RootLayOutContext } from "../layouts/RootLayout"
import { wsURL } from "../utils/api"

function ChatRoom() {
    const [errorOrMessage, setErrorOrMessage] = useState(null)
    const { userAuth } = useContext(RootLayOutContext)
    const [height, setHeight] = useState(window.innerHeight)
    const [chatRoomName, setChatRoomName] = useState('public')
    const { state, pathname } = useLocation()

    // function handleWebSocket() {
    //     const params = `?user=${userAuth?.user}&token=${userAuth?.token}`
    //     const URL = `${wsURL}/ws/chat/room/${chatRoomName}/${params}`;
    //     const ws = new WebSocket(URL);

    //     ws.addEventListener("open", (event) => {
    //         console.log("Websocket connection established.");
    //         ws.send(JSON.stringify(chatMessage));
    //     });

    //     ws.addEventListener("message", (event) => {
    //         const data = JSON.parse(event.data);
    //         if (data?.message) {
    //            createMessageElement(data)
    //            console.log(data)
    //         }
    //         else if (data.error) {
    //             console.log(data.error)
    //         }
    //     });

    //     ws.addEventListener("close", (event)=> {
    //         console.log("WebSocket connection closed");
    //         console.log(event)
    //     })

    //     ws.addEventListener("error", (event)=> {
    //         console.error("WebSocket error:", event.error);
    //     })
    // }

    function setWindowHeight(params) {
        const windowHeight = window.innerHeight
        const chatRoomsMain = document.querySelector('.chat-rooms-main')
        chatRoomsMain.maxHeight = `${windowHeight}px`
        setHeight(windowHeight)
    }

    useEffect(()=> {
        window.addEventListener('resize', setWindowHeight)
        return () => window.removeEventListener('resize', setWindowHeight)
    }, [height])

    useEffect(()=> {
        if (state) {
            setErrorOrMessage(state)
        }
        const id = setTimeout(() => {
            setErrorOrMessage(null)
            clearTimeout(id)
        }, 5000);
    }, [])

    useEffect(()=> {
        document.title = "Chat Room"
        if (state?.message || state?.error) {
            window.history.replaceState(
                {state: null}, '', '/chat-room'
            )
        }
    }, [])

    if (!userAuth) {
        return (
            <Navigate to="/sign-in" replace={true} state={{error:'Please sign in.'}}/>
        )
    }

    return (
        <div className="chat-rooms-main">
            {errorOrMessage?.message &&
                <div onClick={()=>setErrorOrMessage(null)} className="message-row show-message-row">
                    <div className="message-container">
                        <p className="message">{errorOrMessage.message}</p>
                        <button className="message-close-btn">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            }
            {errorOrMessage?.error &&
                <div onClick={()=>setErrorOrMessage(null)} className="error-row show-error-row">
                   <div className="error-container">
                        <p className="error">{errorOrMessage.error}</p>
                        <button className="error-close-btn">
                            <i className="fas fa-times"></i>
                        </button>
                   </div>
                </div>
            }
            <div className="chat-room-container">
                <div className="chat-room-icons-row">
                    <NavLink
                        to="." 
                        end={true}
                        className={({isActive})=>isActive?
                            'chat-room-icon active-chat-room':
                            'chat-room-icon'}
                    >
                        <i className="fa-solid fa-message"></i>
                        <p>Chats</p>
                    </NavLink>
                     <NavLink
                        to="communities"
                        className={({isActive})=>isActive?
                            'chat-room-icon active-chat-room':
                            'chat-room-icon'}
                    >
                        <i className="fa-solid fa-city"></i>
                        <p>Communities</p>
                    </NavLink>
                    <NavLink
                        to="people"
                        className={({isActive})=>isActive?
                            'chat-room-icon active-chat-room':
                            'chat-room-icon'}
                    >
                        <i className="fa-solid fa-users"></i>
                        <p>People</p>
                    </NavLink>
                    
                </div>
                <Outlet context={{}}/>
            </div>
        </div>
    );
}

export default ChatRoom;
