import React from "react";
import axios from "axios";
import {UsersType} from "../../../redux/users-reducer";
import {UsersClass} from "./UsersClass";
import {Preloader} from "../preloader/Preloader";

type PropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    follow: (followed: boolean, userID: number) => void
    unFollow: (followed: boolean, userID: number) => void
    setUsers: (users: Array<UsersType>) => void
    changePageNumber: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (value: boolean) => void
}

class UsersAPIComponentClass extends React.Component<PropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true);
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).
            then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    };

    changePage(pageNumber: number) {
        this.props.toggleIsFetching(true);
        this.props.changePageNumber(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).
        then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
        });
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