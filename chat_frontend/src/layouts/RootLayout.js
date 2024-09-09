/* eslint-disable no-unused-vars */

import React, { useState, createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


export const RootLayOutContext = createContext()

function RootLayout() {
    const [userAuth, setUserAuth] = useState(JSON.parse(localStorage.getItem('user'))||null)

    console.log(setUserAuth)

    return (
        <RootLayOutContext.Provider value={{userAuth, setUserAuth}}>
            <header>
                <Navbar/>
            </header>
            <main>
                <Outlet context={{userAuth, setUserAuth}}/>
            </main>
            <footer>

            </footer>
        </RootLayOutContext.Provider>
    );
}

export default RootLayout;
