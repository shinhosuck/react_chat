import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchChatRoomCommunities } from "../utils/api";
import { URL } from "../utils/api"


function Communities() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ communities, setcommunities] = useState(null);
    const { state, pathname } = useLocation()


    async function getChatRoomNames() {
        const url = `${URL}/api/chat/communities/`;
        const data = await fetchChatRoomCommunities(url);
        setcommunities(data);
        setIsLoading(false)
    }

    useEffect(() => {
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
        <div className="communities">
            <h2 className="chat-history-header">Communities</h2>
            {communities &&
                communities.map((community) => {
                    return (
                        <Link
                            state={{
                                redirect:'Communities',
                                community:community.name, 
                                redirectPath:pathname,
                                logo_url:community.logo_url,
                            }}
                            to={`../../chatting/in/${community.name}`}
                            key={community.id}
                            className={state?.community === community.name &&
                                'community-link active-chat-room' ||
                                'community-link'
                            }
                        >
                            <div className="community-name-image-container">
                                <div className="community-img-container">
                                    <img className="community-img" src={community.logo_url} alt="community_image" />
                                </div>
                                <span className="community-name">{community.name}</span>
                            </div>
                            <div className="community-total-users">
                                <span>{community.users_in_the_room.user_count}</span> 
                                <span>{community.users_in_the_room.user_count > 1 ? 'users':'user'}</span>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
}
export default Communities;
