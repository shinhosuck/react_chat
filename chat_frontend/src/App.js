/* eslint-disable no-unused-vars */

import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

// user auth
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"

import ChatRooms from "./components/ChatRooms";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="chat-room" element={<ChatRoom />}>
                <Route path=":name" element={<ChatRoom />} />
            </Route>
            <Route path="sign-up" element={<Signup />} />
            <Route path="sign-in" element={<Signin />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={routes} />;
}

export default App;
