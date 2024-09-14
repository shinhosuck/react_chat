
import React, { useEffect, useRef, useState, useContext } from "react";
import { 
    useLocation, 
    useParams, 
    useOutletContext, 
    Navigate,
    Outlet,
    NavLink
} from "react-router-dom";
// import Messages from "../components/Messages";
// import ChatRooms from "../components/ChatRooms";
// import People from "../components/People"
// import Chats from "../components/Chats"
import { RootLayOutContext } from "../layouts/RootLayout"
import { wsURL } from "../utils/api"
import { createMessageElement } from "../utils/createElement"


function ChatRoom() {
    const [chatMessage, setChatMessage] = useState({id:'',message:''});
    const [errorOrMessage, setErrorOrMessage] = useState(null)
    const { userAuth, setUserAuth } = useContext(RootLayOutContext)
    const [height, setHeight] = useState(window.innerHeight)
    const [chatRoomName, setChatRoomName] = useState('public')
    const [newMessageID, setNewMessageID] = useState(null)
    const [chatType, setChatType] = useState(null)
    const { name } = useParams();
    const { state, pathname } = useLocation()

    console.log(pathname)
    

    function handleWebSocket() {
        const params = `?user=${userAuth?.user}&token=${userAuth?.token}`
        const URL = `${wsURL}/ws/chat/room/${chatRoomName}/${params}`;
        const ws = new WebSocket(URL);

        ws.addEventListener("open", (event) => {
            console.log("Websocket connection established.");
            ws.send(JSON.stringify(chatMessage));
        });

        ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
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

    useEffect(() => {
        handleWebSocket();
    }, [chatMessage]);

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

    console.log(chatType)

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
                <div className="chat-room-icons-row" style={chatType?{rowGap:'1.5rem'}:{rowGap:'0'}}>
                    <div className='chat-room-chat-room-type' style={chatType?{marginTop:'0'}:{background:'transparent'}}>
                        {chatType?.name &&
                            <><span>Chatting in </span> <span>{chatType.name}</span></>||
                            chatType?.user &&
                            <><span>Chatting with</span> <span>{chatType.user}</span></>
                        }
                    </div> 
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
                <Outlet context={{setChatType, setChatMessage}}/>
            </div>
        </div>
    );
}

export default ChatRoom;
