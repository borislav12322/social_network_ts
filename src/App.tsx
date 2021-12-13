import React from 'react';
import './App.scss';
import {Sidebar} from "./assets/components/sidebar/Sidebar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Messages} from "./assets/components/messages/Messages";
import {UsersClassContainer} from "./assets/components/users/UsersClassContainer";
import {ProfileContainer} from "./assets/components/profile/ProfileContainerClass";
import {HeaderContainer} from "./header/HeaderContainer";
import {Login} from "./assets/components/login/Login";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <HeaderContainer/>
                <div className='content'>
                    <Sidebar/>
                    <div className="wrapper">
                        <Routes>

                            <Route
                                path={'/profile/:id'}
                                element={<ProfileContainer/>}
                            />

                            <Route
                                path={'/messages'}
                                element={<Messages/>}
                            />

                            <Route
                                path={'/users'}
                                element={<UsersClassContainer/>}
                            />

                            <Route
                                path={'/login'}
                                element={<Login/>}
                            />

                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
