import React from "react";
import {
    ActionUsersType,
    changePageNumberAC,
    followAC, setTotalUsersCountAC,
    setUsersAC, toggleIsFetchingAC,
    unFollowAC, UsersType,
} from "../../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import UsersAPIComponentClass from "./UsersAPIComponentClass";
import {AppRootStateType} from "../../../redux/store";
import {Dispatch} from "redux";

export const UsersClassContainer = () => {
    const users = useSelector<AppRootStateType, Array<UsersType>>(state => state.usersReducer.users);
    const pageSize = useSelector<AppRootStateType, number>(state => state.usersReducer.pageSize);
    const totalUsersCount = useSelector<AppRootStateType, number>(state => state.usersReducer.totalUsersCount);
    const currentPage = useSelector<AppRootStateType, number>(state => state.usersReducer.currentPage);
    const isFetching = useSelector<AppRootStateType, boolean>(state => state.usersReducer.isFetching);

    const dispatch = useDispatch<Dispatch<ActionUsersType>>();


    const follow = (followed: boolean, userID: number) => {
        dispatch(followAC(followed, userID))
    }

    const unFollow = (followed: boolean, userID: number) => {
        dispatch(unFollowAC(followed, userID))
    }

    const setUsers = (users: Array<UsersType>) => {
        dispatch(setUsersAC(users))
    }

    const changePageNumber = (pageNumber: number) => {
        dispatch(changePageNumberAC(pageNumber))
    }

    const setTotalUsersCount = (totalCount: number) => {
        dispatch(setTotalUsersCountAC(totalCount))
    }

    const toggleIsFetching = (value: boolean) => {
      dispatch(toggleIsFetchingAC(value))
    }

    return (
        <>
            <UsersAPIComponentClass
                users={users}
                pageSize={pageSize}
                totalUsersCount={totalUsersCount}
                currentPage={currentPage}
                isFetching={isFetching}
                follow={follow}
                unFollow={unFollow}
                setUsers={setUsers}
                changePageNumber={changePageNumber}
                setTotalUsersCount={setTotalUsersCount}
                toggleIsFetching={toggleIsFetching}
            />
        </>
    )
}

