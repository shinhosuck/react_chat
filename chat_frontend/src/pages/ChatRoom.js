
import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation, useParams, useOutletContext, Navigate } from "react-router-dom";
import Messages from "../components/Messages";
import ChatRooms from "../components/ChatRooms";
import { RootLayOutContext } from "../layouts/RootLayout"

function ChatRoom() {
    const [message, setMessage] = useState(null);
    const  { userAuth, setUserAuth } = useContext(RootLayOutContext)
    const [isLoading, setIsLoading] = useState(true)
    const messageRef = useRef();
    const { name } = useParams();
    const { state } = useLocation()

    function handleWebSocket() {
        const URL = "ws://127.0.0.1:8000/ws/chat/room/public/";
        const ws = new WebSocket(URL);

        ws.addEventListener("open", (event) => {
            console.log("Websocket connection established.");
            ws.send(JSON.stringify({message:'hello'}));
        });

        ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            // console.log(data);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newMessage = messageRef.current.value;
        setMessage({ newMessage });
    }

    useEffect(() => {
        handleWebSocket();
        setIsLoading(false)
        document.title = "Chat Room"
    }, []);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (!userAuth) {
        return (
            <Navigate to="/sign-in" replace={true} state={{error:'You not signed in yet.'}}/>
        )
    }

    return (
        <div>
            {state?.message && <p className='message'>{state.message}</p>}
            {state?.error && <p className='error'>{state.error}</p>}
            <ChatRooms />
            <Messages name={name} />
            <form action="" onSubmit={handleSubmit}>
                <input type="text" ref={messageRef} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ChatRoom;
