import React, {useEffect} from 'react';
import './App.scss';
import {Sidebar} from "./assets/components/sidebar/Sidebar";
import {BrowserRouter, Route, Routes, Outlet, Navigate} from "react-router-dom";
import {Messages} from "./assets/components/messages/Messages";
import {UsersClassContainer} from "./assets/components/users/UsersClassContainer";
import {ProfileContainer} from "./assets/components/profile/ProfileContainerClass";
import {HeaderContainer} from "./header/HeaderContainer";
import {Login} from "./login/Login";
import {LoginFormik} from "./login/LoginFormik";
import {useDispatch, useSelector} from "react-redux";
import {authMeThunkCreator, logoutTC} from "./redux/auth-reducer";
import {AppRootStateType} from "./redux/store";
import {CircularProgress} from "@mui/material";
import {Profile} from "./assets/components/profile/Profile";


function App() {

    const dispatch = useDispatch();

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.authReducer.isAuth);
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.authReducer.isLoggedIn);
    const myId = useSelector<AppRootStateType, number|null>(state => state.authReducer.id);

    isLogged ? console.log(`IsLogged is ${isLogged}`) : console.log(`IsLogged is ${isLogged}`);

    useEffect(() => {
        dispatch(authMeThunkCreator());
    }, [dispatch]);
    console.log();

    if (!isAuth) {
        return <div><CircularProgress/></div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <HeaderContainer/>
                <div className='content'>
                    <Sidebar/>
                    <div className="wrapper">
                        <Outlet/>

                        <Routes>

                            <Route
                                path={'/profile/:id'}
                                element={<ProfileContainer/>}
                            />

                            <Route
                                path={'/'}
                                element={<Navigate to={`/profile/${myId}`}/>}
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

                            <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                            <Route path={'*'} element={<Navigate to={'/404'}/>}/>

                            {/*<Route*/}
                            {/*    path={'/login'}*/}
                            {/*    element={<LoginFormik/>}*/}
                            {/*/>*/}

                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
