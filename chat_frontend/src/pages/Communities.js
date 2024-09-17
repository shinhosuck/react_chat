import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchChatRoomNames } from "../utils/api";
import { URL } from "../utils/api"

const url = `${URL}/api/chat/rooms/`;

function Communities() {
    const [rooms, setRooms] = useState(null);
    const { state, pathname } = useLocation()

    async function getChatRoomNames() {
        const data = await fetchChatRoomNames(url);
        setRooms(data);
    }

    useEffect(() => {
        getChatRoomNames();
    }, []);
    return (
        <div className="communities-container">
            <div className="communities">
                {rooms &&
                    rooms.map((room) => {
                        return (
                            <Link
                                state={{
                                    redirect:'Communities',
                                    name:room.name, 
                                    redirectPath:pathname,
                                    messages: room.messages
                                }}
                                to={`../../chatting/in/${room.name}`}
                                key={room.id}
                                className={state?.name === room.name &&
                                    'community-link active-chat-room' ||
                                    'community-link'
                                }
                            >
                                <span>{room.name}</span>
                                <span>10 users</span>
                            </Link>
                        );
                    })}
                   
            </div>
        </div>
    );
}
export default Communities;
