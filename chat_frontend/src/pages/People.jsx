import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation} from 'react-router-dom'
import { URL, getUsers } from '../utils/api'
import { RootLayOutContext } from '../layouts/RootLayout'


function People() {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ users, setUsers ] = useState(null)
    const { pathname, state } = useLocation()
    const { userAuth } = useContext(RootLayOutContext)

    useEffect(()=> {
        async function fetchUsers() {
            const url = `${URL}/api/auth/users/`
            const token = userAuth.token
            const data = await getUsers(url, token)
            setUsers(data)
            setIsLoading(false)
        }
        fetchUsers()
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
        <div className='people-container'>
            {users?.map((person)=> {
                return (
                    <Link
                        key={person.id}
                        className={state?.user && state.user === person.user ?
                            'people-link active-chat-room' : 
                            'people-link'}
                        to={`../../chatting/with/${person.user}`}
                        state = {{redirect:'People', 
                            user:person.user, 
                            redirectPath:pathname,
                            avatar_url: person.avatar_url
                        }}
                    >
                        <div className="person-info-container">
                            <div className="person-img-container">
                                <img className="person-avatar" src={person.avatar_url} alt="avatar" />
                            </div>
                            <span className="person-name">{person.user}</span>
                        </div>
                        <span className="person-online">online</span>
                    </Link>
                )
            })}
        </div>
    )
}
export default People

 