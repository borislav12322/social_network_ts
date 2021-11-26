import React from 'react';
import './App.scss';
import {Header} from "./header/Header";
import {Sidebar} from "./assets/components/sidebar/Sidebar";
import {Profile} from "./assets/components/profile/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Messages} from "./assets/components/messages/Messages";
import {Users} from "./assets/components/users/Users";

type PropsType = {

}

function App(props: PropsType) {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <div className='content'>
                    <Sidebar/>
                    <div className="wrapper">
                        <Routes>

                            <Route
                                path={'/profile'}
                                element={<Profile/>}
                            />

                            <Route
                                path={'/messages'}
                                element={<Messages/>}
                            />

                            <Route
                                path={'/users'}
                                element={<Users/>}
                            />

                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
