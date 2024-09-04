/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";

function ChatRoom() {
    function handleWebSocket(params) {
        const URL = "ws://127.0.0.1:8000/ws/chat/room/public/";
        const ws = new WebSocket(URL);

        ws.addEventListener("open", (event) => {
            console.log("Websocket connection established.");
            ws.send(JSON.stringify({ message: "hello world" }));
        });

        ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
        });
    }

    useEffect(() => {
        handleWebSocket();
    }, []);
    return <div>ChatRoom</div>;
}

export default ChatRoom;
