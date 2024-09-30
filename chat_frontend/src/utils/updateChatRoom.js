import { 
    URL, 
    updateCommunityRoom, 
    removeUserFromChatRoom 
} from "./api";
import { redirect } from 'react-router-dom'

export async function updateChatRoom(state, userAuth) {
    const communityName = state?.community && state.community
    const user = state?.user && state.user
    const url = `${URL}/api/update/community/room/`

    if (communityName) {
        let community = JSON.parse(sessionStorage.getItem('community')) || {}
        
        if ('currentRoom' in community === false) {
            community.currentRoom = communityName
            community.username = userAuth.user

            sessionStorage.setItem('community', JSON.stringify(community))
        }
        else {
            if (community.currentRoom !== communityName) {
                community = {
                    ...community,
                    previousRoom:community.currentRoom,
                    currentRoom:communityName
                }
                sessionStorage.setItem('community', JSON.stringify(community))
            }
        }
        return await updateRoom(url, userAuth.token)
    }
    if (user) {
        // console.log(user)
        return user
    }
}

async function updateRoom(url, token) {
    const community = JSON.parse(sessionStorage.getItem('community'))
    const data = await updateCommunityRoom(url, community, token)
    return data
}

export async function updateChatSession(user) {
    const url = `${URL}/api/update/community/chat-session/${user.username}/`
    const data =  await removeUserFromChatRoom(url, user.token)
    return data?.error && data
}