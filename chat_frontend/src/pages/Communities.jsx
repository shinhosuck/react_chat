import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchChatRoomCommunities } from "../utils/api";
import { URL } from "../utils/api"



function Communities() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ communities, setcommunities] = useState(null);
    const { state, pathname } = useLocation()

    
    useEffect(() => {
        async function getChatRoomNames() {
            const url = `${URL}/api/chat/communities/`;
            const data = await fetchChatRoomCommunities(url);
            setcommunities(data);
            setIsLoading(false)
        }
        getChatRoomNames()
    }, []);

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
        <div className="communities-container">
            <div className="communities">
                {communities &&
                    communities.map((community) => {
                        return (
                            <Link
                                state={{
                                    redirect:'Communities',
                                    community:community.name, 
                                    redirectPath:pathname,
                                }}
                                to={`../../chatting/in/${community.name}`}
                                key={community.id}
                                className={state?.community === community.name &&
                                    'community-link active-chat-room' ||
                                    'community-link'
                                }
                            >
                                <span>{community.name}</span>
                                <span>10 users</span>
                            </Link>
                        );
                    })}
                   
            </div>
        </div>
    );
}
export default Communities;
