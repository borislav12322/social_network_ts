import React, {useCallback} from "react";
import {
    ActionUsersType,
    changePageNumberAC,
    changePageSizeAC,
    changePageThunkCreator,
    followThunkCreator,
    getUsersThunkCreator,
    setTotalUsersCountAC,
    setUsersAC,
    toggleIsFetchingAC,
    unfollowThunkCreator,
    UsersType,
} from "../../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import UsersAPIComponentClass from "./UsersAPIComponentClass";
import {AppRootStateType} from "../../../redux/store";
import {Dispatch} from "redux";
import {AuthRedirect} from "../../../HOC/AuthRedirect";

export const UsersClassContainer = AuthRedirect(() => {
    const users = useSelector<AppRootStateType, Array<UsersType>>(state => state.usersReducer.users);
    let pageSize = useSelector<AppRootStateType, number>(state => state.usersReducer.pageSize);
    const totalUsersCount = useSelector<AppRootStateType, number>(state => state.usersReducer.totalUsersCount);
    const currentPage = useSelector<AppRootStateType, number>(state => state.usersReducer.currentPage);
    const isFetching = useSelector<AppRootStateType, boolean>(state => state.usersReducer.isFetching);
    const followingInProgress = useSelector<AppRootStateType, Array<number>>(state => state.usersReducer.followingInProgress);

    console.log(pageSize)

    const dispatch = useDispatch<Dispatch<ActionUsersType>>();

    const follow = useCallback((followed: boolean, userID: number) => {
        dispatch(followThunkCreator(followed, userID));
    }, [dispatch])

    const unFollow = useCallback((followed: boolean, userID: number) => {
        dispatch(unfollowThunkCreator(followed, userID));
    }, [dispatch])

    const setUsers = useCallback((users: Array<UsersType>) => {
        dispatch(setUsersAC(users));
    }, [])

    const changePageNumber = useCallback((pageNumber: number) => {
        dispatch(changePageNumberAC(pageNumber));
    }, [])

    const setTotalUsersCount = useCallback((totalCount: number) => {
        dispatch(setTotalUsersCountAC(totalCount));
    }, [])

    const toggleIsFetching = useCallback((value: boolean) => {
        dispatch(toggleIsFetchingAC(value));
    }, [])

    const getUsers = useCallback((currentPage: number, pageSize: number) => {
        dispatch(getUsersThunkCreator(currentPage, pageSize))
    }, [])

    const changePage = useCallback((pageNumber: number, pageSize: number) => {
        dispatch(changePageThunkCreator(pageNumber, pageSize))
    }, [])

    const changePageSize = (value: number) => {
        dispatch(changePageSizeAC(value))
    }

    return (
        <>
            <UsersAPIComponentClass
                users={users}
                pageSize={pageSize}
                totalUsersCount={totalUsersCount}
                currentPage={currentPage}
                isFetching={isFetching}
                followingInProgress={followingInProgress}
                follow={follow}
                unFollow={unFollow}
                setUsers={setUsers}
                changePageNumber={changePageNumber}
                setTotalUsersCount={setTotalUsersCount}
                toggleIsFetching={toggleIsFetching}
                getUsers={getUsers}
                changePage={changePage}
                changePageSize={changePageSize}
            />
        </>
    )
});