import React from "react";
import {changePageThunkCreator, UsersType} from "../../../redux/users-reducer";
import {UsersClass} from "./UsersClass";
import {Preloader} from "../preloader/Preloader";
import {usersAPI} from "../../../API/API";

type PropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    follow: (followed: boolean, userID: number) => void
    unFollow: (followed: boolean, userID: number) => void
    setUsers: (users: Array<UsersType>) => void
    changePageNumber: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (value: boolean) => void
    getUsers: (currentPage: number, pageSize: number) => void
    changePage: (currentPage: number, pageSize: number) => void
}

class UsersAPIComponentClass extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    };

    changePage(pageNumber: number) {
        this.props.changePage(pageNumber, this.props.pageSize)
    };

    render() {

        const onClickHandler = (pageNumber: number) => {
            this.changePage(pageNumber)
        }

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}

                <UsersClass users={this.props.users}
                            totalUsersCount={this.props.totalUsersCount}
                            pageSize={this.props.pageSize}
                            followingInProgress={this.props.followingInProgress}
                            currentPage={this.props.currentPage}
                            changePage={onClickHandler}
                            unFollow={this.props.unFollow}
                            follow={this.props.follow}
                />
            </>
        )
    }
}

export default UsersAPIComponentClass;