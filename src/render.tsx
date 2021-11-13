import React from "react";
import {addPost, onChangeHandler, stateType} from "./redux/state";
import ReactDOM from "react-dom";
import App from "./App";

export const RenderTree = (state: stateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} changeTextAreaHandler={onChangeHandler}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}