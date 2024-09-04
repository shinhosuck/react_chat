/* eslint-disable no-unused-vars */

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
    return (
        <React.Fragment>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer></footer>
        </React.Fragment>
    );
}

export default RootLayout;
