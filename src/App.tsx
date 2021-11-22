import React from 'react';
import './App.scss';
import {Header} from "./header/Header";
import {Sidebar} from "./assets/components/sidebar/Sidebar";
import {Profile} from "./assets/components/profile/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Messages} from "./assets/components/messages/Messages";
import {stateType} from "./redux/state";

type PropsType = {
    state: stateType
    dispatch: (action: any) => void
}

function App(props: PropsType) {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <div className='content'>
                    <Sidebar sidebar={props.state.sidebar}/>
                    <div className="wrapper">
                        <Routes>
                            <Route
                                path={'/profile'}
                                element={
                                    <Profile
                                        profile={props.state.profile}

                                        dispatch={props.dispatch}
                                    />}
                            />

                            <Route
                                path={'/messages'}
                                element={
                                    <Messages
                                        messages={props.state.messages}
                                        dispatch={props.dispatch}
                                        state={props.state}
                                    />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
