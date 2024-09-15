import React from 'react'
import { useOutletContext, Link, useLocation } from 'react-router-dom'
import avatar from '../images/avatar.png'

function ChatHistory() {
  const { pathname } = useLocation()


  return (
    <div className="chat-history-container">
        <div className="chat-history">
            <Link 
              state={{redirect:'chats',user:'James', redirectPath:pathname}}
              className="chat-history-link" 
              to="../chatting/with/james" 
            >
              <div className="chat-history-profile-img-container">
                <img src={avatar} alt="" />
              </div>
              <div className="chat-history-username-date">
                 <span>James</span>
                 <span>{new Date().toLocaleDateString()}</span>
              </div>
            </Link>
            <Link
              state={{redirect:'chats',user:'greg',redirectPath:pathname}}
              className="chat-history-link" 
              to="../chatting/with/greg" 
            >
              <div className="chat-history-profile-img-container">
                <img src={avatar} alt="" />
              </div>
              <div className="chat-history-username-date">
                 <span>Greg</span>
                 <span>{new Date().toLocaleDateString()}</span>
              </div>
            </Link>
            <Link
              state={{type:'user',user:'dan'}}
              className="chat-history-link" 
              to="dan/messages" 
            >
              <div className="chat-history-profile-img-container">
                <img src={avatar} alt="" />
              </div>
              <div className="chat-history-username-date">
                 <span>Dan</span>
                 <span>{new Date().toLocaleDateString()}</span>
              </div>
            </Link>
            <Link
              state={{type:'user',user:'matt'}}
              className="chat-history-link" 
              to="matt/messages" 
            >
              <div className="chat-history-profile-img-container">
                <img src={avatar} alt="" />
              </div>
              <div className="chat-history-username-date">
                 <span>Matt</span>
                 <span>{new Date().toLocaleDateString()}</span>
              </div>
            </Link>
            <Link
              state={{type:'user',user:'smith'}}
              className="chat-history-link" 
              to="smith/messages" 
            >
              <div className="chat-history-profile-img-container">
                <img src={avatar} alt="" />
              </div>
             <div className="chat-history-username-date">
                 <span>Smith</span>
                 <span>{new Date().toLocaleDateString()}</span>
              </div>
            </Link>
            <Link
              state={{type:'user',user:'olson'}}
              className="chat-history-link" 
              to="olson/messages" 
            >
              <div className="chat-history-profile-img-container">
                <img src={avatar} alt="" />
              </div>
              <div className="chat-history-username-date">
                 <span>Olson</span>
                 <span>{new Date().toLocaleDateString()}</span>
              </div>
            </Link>
            <Link
              state={{type:'user',user:'julio'}}
              className="chat-history-link" 
              to="julio/messages" 
            >
              <div className="chat-history-profile-img-container">
                <img src={avatar} alt="" />
              </div>
              <div className="chat-history-username-date">
                 <span>Julio</span>
                 <span>{new Date().toLocaleDateString()}</span>
              </div>
            </Link>
            <Link
              state={{type:'user',user:'muhamit'}}
              className="chat-history-link" 
              to="muhamit/messages" 
            >
              <div className="chat-history-profile-img-container">
                <img src={avatar} alt="" />
              </div>
              <div className="chat-history-username-date">
                 <span>Muhami</span>
                 <span>{new Date().toLocaleDateString()}</span>
              </div>
            </Link>
            <Link
              state={{type:'user',user:'jackson'}}
              className="chat-history-link" 
              to="jackson/messages" 
            >
              <div className="chat-history-profile-img-container">
                <img src={avatar} alt="" />
              </div>
              <div className="chat-history-username-date">
                 <span>Jackson</span>
                 <span>{new Date().toLocaleDateString()}</span>
              </div>
            </Link>
            <Link 
              state={{type:'user',user:'bobby'}}
              className="chat-history-link" 
              to="bobby/messages" 
            >
              <div className="chat-history-profile-img-container">
                <img src={avatar} alt="" />
              </div>
                <div className="chat-history-username-date">
                 <span>Bobby</span>
                 <span>{new Date().toLocaleDateString()}</span>
              </div>
            </Link>
        </div>
    </div>
  )
}

export default ChatHistory