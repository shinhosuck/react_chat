import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";

import Messages from "./pages/Messages";
import ChatRoom from "./pages/ChatRoom";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Messages />} />
            <Route path="chat-room" element={<ChatRoom />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={routes} />;
}

export default App;
