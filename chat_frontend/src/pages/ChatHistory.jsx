import React, { useState, useEffect, useContext } from 'react'
import { useOutletContext, Link, useLocation } from 'react-router-dom'
import avatar from '../images/avatar.png'
import { URL, fetchChatHistory } from '../utils/api'
import { RootLayOutContext } from '../layouts/RootLayout'

function ChatHistory() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ chatHistory, setChatHistory ] = useState(null)
    const { pathname } = useLocation()
    const { userAuth } = useContext(RootLayOutContext)

    useEffect(()=> {
        async function getChatHistory() {
            const url = `${URL}/api/chat/history/${userAuth.user}/`
            const data = await fetchChatHistory(url, userAuth.token)
            setChatHistory(data[0])
            setIsLoading(false)
        }
        getChatHistory()
    }, [])

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
        <div className="chat-history-container">
            <div className="chat-history">
                {chatHistory?.users.length > 0 &&
                    <div className="chat-history-users">
                        <h3 className="chat-history-header">Users</h3>
                        {chatHistory.users.map((user)=> {
                            const lastChatDate = chatHistory.last_chat_date_user[user]
                            return (
                                <Link
                                    key={user} 
                                    state={{redirect:'Chats',user:user, redirectPath:pathname}}
                                    className="chat-history-link" 
                                    to={`../chatting/with/${user}`}
                                >
                                    <div className="chat-history-profile-img-container">
                                        <img src={avatar} alt="" />
                                    </div>
                                    <div className="chat-history-username-date">
                                        <span>{user}</span>
                                        <span>{new Date(lastChatDate).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                }
                {chatHistory?.communities.length > 0 &&
                    <div className="chat-history-communities">
                        <h3 className="chat-history-header">Communities</h3>
                        {chatHistory.communities.map((community)=> {
                            const lastChatDate = chatHistory.last_chat_date_community[community]
                            return (
                                <Link
                                    key={community}
                                    state={{redirect:'Chats',community:community, redirectPath:pathname}}
                                    className="chat-history-link" 
                                    to={`../chatting/in/${community}`} 
                                >
                                    <div className="chat-history-profile-img-container">
                                        <img src={avatar} alt="" />
                                    </div>
                                    <div className="chat-history-username-date">
                                        <span>{community}</span>
                                        <span>{new Date(lastChatDate).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default ChatHistory