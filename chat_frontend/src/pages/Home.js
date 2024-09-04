import React from "react";

function Home() {
    function handleSubmit(params) {}
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button>Sign in</button>
            </form>
        </div>
    );
}

export default Home;
