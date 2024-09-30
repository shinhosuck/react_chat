import React, { useState, useEffect, useContext } from 'react'
import { useOutletContext, Link, useLocation } from 'react-router-dom'
import avatar from '../images/avatar.png'
import { URL, fetchChatHistory } from '../utils/api'
import { RootLayOutContext } from '../layouts/RootLayout'
import TimeAgo from 'react-timeago'

function ChatHistory() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ chatHistory, setChatHistory ] = useState(null)
    const { pathname } = useLocation()
    const { userAuth } = useContext(RootLayOutContext)

    useEffect(()=> {
        async function getChatHistory() {
            const url = `${URL}/api/chat/history/${userAuth.user}/`
            const data = await fetchChatHistory(url, userAuth.token)
            setChatHistory(data)
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
        <div className="chat-history">
            {chatHistory &&
                <>
                    {chatHistory?.users &&
                        <div className="chat-history-users">
                            <h2 className="chat-history-header">Users</h2>
                            {chatHistory.users.map((user)=> {
                                return (
                                    <Link
                                        className="chat-history-link" 
                                        to={`../chatting/with/${user.username}`}
                                        key={user.username} 
                                        state={{
                                            redirect:'Chats',
                                            user:user.username, 
                                            redirectPath:pathname,
                                            avatar_url: user.avatar_url
                                        }}
                                    >
                                        <div className="chat-history-profile-img-name-container">
                                            <div className="chat-history-profile-img">
                                                <img src={user.avatar_url} alt="avatar" />
                                            </div>
                                            <div className="chat-history-profile-username">
                                                <span className="username">{user.username}</span>
                                                <span className="last-message">{user.last_message}</span>
                                            </div>
                                        </div>
                                        <div className="chat-history-date-container">
                                            <span className="last-chat-date">
                                                <TimeAgo date={user.last_chat_date} />
                                            </span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    }
                    {chatHistory?.communities &&
                        <div className="chat-history-communities">
                            <h2 className="chat-history-header">Communities</h2>
                            {chatHistory.communities.map((community)=> {
                                return (
                                    <Link
                                        className="chat-history-link" 
                                        to={`../chatting/in/${community.community}`} 
                                        key={community.community}
                                        state={{
                                            redirect:'Chats',
                                            community:community.community,
                                            redirectPath:pathname,
                                            logo_url:community.logo_url
                                        }}
                                    >
                                        <div className="chat-history-profile-img-name-container">
                                            <div className="chat-history-profile-img">
                                                <img src={community.logo_url} alt="" />
                                            </div>
                                            <div className="chat-history-profile-name">
                                                <span className="name">{community.community}</span>
                                                <span className="last-message">{community.last_message}</span>
                                            </div>
                                        </div>
                                        <div className="chat-history-date-container">
                                            <span className="last-chat-date">
                                                <TimeAgo date={community.last_chat_date} />
                                            </span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    }
                </>     
            }
            <h2 className="no-chat-history">{chatHistory.message}</h2>
        </div>
    )
}

export default ChatHistory