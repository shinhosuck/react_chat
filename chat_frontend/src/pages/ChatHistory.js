import React from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import avatar from '../images/avatar.png'

function ChatHistory() {
  const { chatType, setChatType } = useOutletContext()
  return (
    <div className="chat-history-container">
        <div className="chat-history">
            <Link 
              state={{type:'user',user:'James'}}
              className="chat-history-link" 
              to="james/messages" 
              onClick={()=>setChatType({type:'user',user:'James'})}
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
              state={{type:'user',user:'greg'}}
              className="chat-history-link" 
              to="greg/messages" 
              onClick={()=>setChatType({type:'user',user:'Greg'})}
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
              onClick={()=>setChatType({type:'user',user:'Dan'})}
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
              onClick={()=>setChatType({type:'user',user:'Matt'})}
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
              onClick={()=>setChatType({type:'user',user:'Smith'})}
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
              onClick={()=>setChatType({type:'user',user:'Olson'})}
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
              onClick={()=>setChatType({type:'user',user:'Julio'})}
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
              onClick={()=>setChatType({type:'user',user:'Muhamit'})}
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
              onClick={()=>setChatType({type:'user',user:'Jackson'})}
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
              onClick={()=>setChatType({type:'user',user:'Bobby'})}
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