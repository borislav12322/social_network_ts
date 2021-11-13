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
    addPost: (postMessage: string) => void
    changeTextAreaHandler: (newText: string) => void
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
                            <Route path={'/profile'} element={<Profile profile={props.state.profile} addPost={props.addPost} changeTextAreaHandler={props.changeTextAreaHandler}/>}/>
                            <Route path={'/messages'} element={<Messages messages={props.state.messages} />}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
