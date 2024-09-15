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
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import ChatHistory from "./pages/ChatHistory"
import People from "./pages/People"
import Communities from "./pages/Communities"
import Messages from "./pages/Messages"


const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="chat-room" element={<ChatRoom />}>
                <Route index element={<ChatHistory />} />
                <Route path='people' element={<People />} />
                <Route path="communities" element={<Communities />}/>
            </Route>
            <Route path="chatting/:str/:str" element={<Messages />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="sign-in" element={<Signin />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={routes} />;
}

export default App;
