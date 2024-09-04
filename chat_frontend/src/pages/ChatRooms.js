/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchChatRoomNames } from "../utils/api";

const url = "http://127.0.0.1:8000/api/chat/rooms/";

function ChatRooms() {
    const [rooms, setRooms] = useState(null);

    async function getChatRoomNames() {
        const data = await fetchChatRoomNames(url);
        setRooms(data);
    }

    useEffect(() => {
        getChatRoomNames();
    }, []);
    return (
        <div className="chat-rooms-container">
            <h1>Chat Rooms</h1>
            <div className="chat-rooms">
                {rooms &&
                    rooms.map((room) => {
                        return (
                            <Link
                                to={`:${room.name}`}
                                key={room.id}
                                className="chat-room"
                            >
                                {room.name}
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}

export default ChatRooms;
