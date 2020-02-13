import React from 'react';
import {MenuAppBar} from "../components/common/menu-app-bar";
import {Home} from "../components/pages/home";

const App = () => {
    return (
        <div className="App">
            <MenuAppBar/>
            <Home />
        </div>
    );
}

export default App;
