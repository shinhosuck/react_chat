/* eslint-disable no-unused-vars */

import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";

import Home from "./pages/Home";
import ChatRooms from "./pages/ChatRooms";
import ChatRoom from "./pages/ChatRoom";
import RootLayout from "./layouts/RootLayout";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="chat-rooms" element={<ChatRooms />} />
            <Route path=":name" element={<ChatRoom />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={routes} />;
}

export default App;
