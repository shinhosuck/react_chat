
export const URL = "http://127.0.0.1:8000"
export const wsURL = "ws://127.0.0.1:8000";

export async function fetchChatRoomCommunities(url) {
    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await resp.json();
    return data;
}

export async function fetchCommunityMessages(url) {
    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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