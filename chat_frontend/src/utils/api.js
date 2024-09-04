/* eslint-disable no-unused-vars */

export async function fetchMessages(url) {
    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await resp.json();
    return data;
}
