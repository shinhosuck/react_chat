import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchChatRoomNames } from "../utils/api";
import { URL } from "../utils/api"

const url = `${URL}/api/chat/rooms/`;

function Communities() {
    const [rooms, setRooms] = useState(null);
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
                                state={{type:'community',name:room.name}}
                                to={`../${room.name}/messages`}
                                key={room.id}
                                className='community-link'
                            >
                                {room.name}
                            </Link>
                        );
                    })}
                   
            </div>
        </div>
    );
}
export default Communities;
