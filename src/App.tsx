import React from 'react';
import './App.scss';
import {Header} from "./header/Header";
import {Sidebar} from "./assets/components/sidebar/Sidebar";
import {Profile} from "./assets/components/profile/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Messages} from "./assets/components/messages/Messages";
import {UsersClassContainer} from "./assets/components/users/UsersClassContainer";
import ProfileContainerClass from "./assets/components/profile/ProfileContainerClass";

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
                                element={<ProfileContainerClass/>}
                            />

                            <Route
                                path={'/messages'}
                                element={<Messages />}
                            />

                            <Route
                                path={'/users'}
                                element={<UsersClassContainer/>}
                            />

                            {/*<Route*/}
                            {/*    path={'/users'}*/}
                            {/*    element={<Users/>}*/}
                            {/*/>*/}

                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
