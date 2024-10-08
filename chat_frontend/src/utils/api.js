
export const URL = window.location.hostname === 'localhost'?
"http://127.0.0.1:8000" : "https://dj-react-chat.vercel.app";

export const wsURL = "ws://127.0.0.1:8000";

export async function fetchChatRoomCommunities(url) {
    try {
        const resp = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await resp.json();
        return data
    } catch (error) {
        return {error:'Please check your network and try gain.'}
    }
}

export async function fetchMessages(url, token) {
    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
    });
    const data = await resp.json();
    return data;
}

export async function getUsers(url, token) {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    })
    const data = await resp.json()
    return data
}

export async function fetchChatHistory(url, token){
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await resp.json()
    return data
}

export async function updateCommunityRoom(url, body, token) {
    try {
        const resp = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await resp.json()
        if (resp.ok) {
            return data 
        }
        else {
            throw new Error(data.error)
        }
    } catch (error) {
        return {error:error.message}
    }
}

export async function removeUserFromChatRoom(url, token) {
    try {
        const resp = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        const data = await resp.json()
        if (resp.ok) {
            return data
        }
        else {
            throw new Error(data.error)
        }
    } catch (error) {
        return {error:error.message}
    }

}

// User authentication

export async function userRegister(url, body) {
    try {
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error.message, error.type);
    }
}

export async function validateUsernameEmail(url, body) {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    const data = await resp.json()
    return data
}

export async function userLogin(url, body) {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error.message, error.type)
    }
}