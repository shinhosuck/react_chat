/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from "react";

function ChatRoom() {
    const [message, setMessage] = useState(null);
    const messageRef = useRef();

    function handleWebSocket() {
        const URL = "ws://127.0.0.1:8000/ws/chat/room/public/";
        const ws = new WebSocket(URL);

        ws.addEventListener("open", (event) => {
            console.log("Websocket connection established.");
            ws.send(JSON.stringify(message && message));
        });

        ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const message = messageRef.current.value;
        setMessage({ message });
    }

    useEffect(() => {
        handleWebSocket();
    }, [message]);
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" ref={messageRef} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ChatRoom;
