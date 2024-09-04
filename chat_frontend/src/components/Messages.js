/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { fetchMessages } from "../utils/api";

const URL = "http://127.0.0.1:8000/api/messages/";

function Messages() {
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        async function getMessages() {
            const messageObjs = await fetchMessages(URL);
            setMessages(messageObjs);
        }
        getMessages();
    });

    return <div>Messages</div>;
}

export default Messages;
