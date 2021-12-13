import React from "react";
import {
    ActionUsersType,
    changePageNumberAC, changePageThunkCreator, followThunkCreator, getUsersThunkCreator, setTotalUsersCountAC,
    setUsersAC, toggleIsFetchingAC, unfollowThunkCreator, UsersType,
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
    const followingInProgress = useSelector<AppRootStateType, Array<number>>(state => state.usersReducer.followingInProgress);


    const dispatch = useDispatch<Dispatch<ActionUsersType>>();

    const follow = (followed: boolean, userID: number) => {
        dispatch(followThunkCreator(followed, userID));
    }

    const unFollow = (followed: boolean, userID: number) => {
        dispatch(unfollowThunkCreator(followed, userID));
    }

    const setUsers = (users: Array<UsersType>) => {
        dispatch(setUsersAC(users));
    }

    const changePageNumber = (pageNumber: number) => {
        dispatch(changePageNumberAC(pageNumber));
    }

    const setTotalUsersCount = (totalCount: number) => {
        dispatch(setTotalUsersCountAC(totalCount));
    }

    const toggleIsFetching = (value: boolean) => {
        dispatch(toggleIsFetchingAC(value));
    }

    const getUsers = (currentPage: number, pageSize: number) => {
        dispatch(getUsersThunkCreator(currentPage, pageSize))
    }
    
    const changePage = (pageNumber: number, pageSize: number) => {
      dispatch(changePageThunkCreator(pageNumber, pageSize))
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
            />
        </>
    )
}

