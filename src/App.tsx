import React from 'react';
import './App.scss';
import {Header} from "./header/Header";
import {Sidebar} from "./assets/components/sidebar/Sidebar";
import {Profile} from "./assets/components/profile/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Messages} from "./assets/components/messages/Messages";
import {Users} from "./assets/components/users/Users";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {UsersType} from "./redux/users-reducer";
import UsersClass from "./assets/components/users/UsersClass";
import {Dispatch} from "redux";

type PropsType = {

}

function App(props: PropsType) {
    const users = useSelector<AppRootStateType, Array<UsersType>>(state => state.usersReducer.users);
    const pageSize = useSelector<AppRootStateType, number>(state => state.usersReducer.pageSize);
    const totalUsersCount = useSelector<AppRootStateType, number>(state => state.usersReducer.totalUsersCount);
    const currentPage = useSelector<AppRootStateType, number>(state => state.usersReducer.currentPage);

    const dispatch = useDispatch<Dispatch>();

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
                                element={<Messages />}
                            />

                            <Route
                                path={'/users'}
                                element={<UsersClass
                                    users={users}
                                    dispatch={dispatch}
                                    pageSize={pageSize}
                                    totalUsersCount={totalUsersCount}
                                    currentPage={currentPage}
                                />}
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
