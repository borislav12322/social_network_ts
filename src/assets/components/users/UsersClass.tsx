import React, {MouseEventHandler} from "react";
import s from './Users.module.scss';
import {
    ActionUsersType,
    changePageNumberAC,
    followAC, setTotalUsersCount,
    setUsersAC,
    unFollowAC,
    UsersType
} from "../../../redux/users-reducer";
import axios from "axios";

type UsersClassType = {
    users: Array<UsersType>
    dispatch: (ac: ActionUsersType) => ActionUsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

class UsersClass extends React.Component<UsersClassType> {

    componentDidMount() {
        if (this.props.users.length === 0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
                this.props.dispatch(setUsersAC(response.data.items));
                this.props.dispatch(setTotalUsersCount(response.data.totalCount));
                console.log(response.data.items)
            });
        }
    };

    changePage(pageNumber: number){
        this.props.dispatch(changePageNumberAC(pageNumber));
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.dispatch(setUsersAC(response.data.items));
        });
    };

    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        const pages: Array<number> = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }


        return (
            <div className={s.users}>

                <div className={s.pagination}>
                    <ul className={s.pagination__list}>
                        {
                            pages.map(pageNumber => {
                                return (
                                    <li onClick={() => this.changePage(pageNumber)} className={`${s.pagination__item} 
                                    ${this.props.currentPage === pageNumber && s.selectedPage}`}>
                                        {pageNumber}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {this.props.users.map(item => {
                    return (
                        <div className={s.userContent} key={item.id}>
                            <div className={s.leftContent}>
                                <img className={s.img} src={item.photos.small ? item.photos.small : 'no photo'} alt=""/>
                                {item.followed ?
                                    <button onClick={() => {
                                        this.props.dispatch(unFollowAC(false, item.id))
                                    }}>Follow</button>
                                    :
                                    <button onClick={() => {
                                        this.props.dispatch(followAC(true, item.id))
                                    }}>Unfollow</button>}
                            </div>

                            <div className={s.content}>
                                <div className={s.row}>
                                    <h2 className={s.userName}>
                                        {item.name}
                                    </h2>
                                    <div className={s.location}>
                                    <span className={s.city}>
                                        {/*{'item.location.city'},*/}
                                    </span>
                                        <span className={s.city}>
                                        {/*{'item.location.country'}*/}
                                    </span>
                                    </div>
                                </div>
                                <p className={s.status}>
                                    {item.status}
                                </p>
                            </div>
                        </div>
                    )
                })}
                <button className={s.moreBtn}>Show more</button>
            </div>
        )
    }
}

export default UsersClass;