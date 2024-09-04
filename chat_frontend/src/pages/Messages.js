/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { fetchMessages } from "../utils/api";

const URL = "http://127.0.0.1:8000/api/all/messages/";

function Messages() {
    useEffect(() => {
        async function getMessages() {
            const messages = await fetchMessages(URL);
            console.log(messages);
        }
        getMessages();
    });

    return <div>Messages</div>;
}

export default Messages;
