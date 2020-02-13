import React from 'react';
import {MenuAppBar} from "../components/common/menu-app-bar";
import {Router} from "../components/router";

const App = () => {
    return (
        <div className="App">
            <MenuAppBar/>
            <Router />
        </div>
    );
}

export default App;
