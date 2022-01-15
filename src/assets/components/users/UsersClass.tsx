import React, {useEffect, useMemo, useState} from "react";
import s from "./Users.module.scss";
import {UsersType} from "../../../redux/users-reducer";
import {NavLink, useNavigate} from "react-router-dom";
import UserDefaultIcon from '../../images/userDefault.png'
import {Pagination, Stack} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";

type PropsType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingInProgress: Array<number>
    changePage: (pageNumber: number) => void
    unFollow: (followed: boolean, userID: number) => void
    follow: (followed: boolean, userID: number) => void
}

export const UsersClass = React.memo((props: PropsType) => {

    const [page, setPage] = useState<number>(1);
    const currentPage = useSelector<AppRootStateType, number>(state => state.usersReducer.currentPage);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        props.changePage(value);
    };

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    const pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    console.log(`current page is ${currentPage}`)

    return (

        <div className={s.users}>
            {console.log(page)}
            <div className={s.pagination}>
                <ul className={s.pagination__list}>

                    <Stack spacing={2}>
                        <Pagination
                            count={pagesCount}
                            page={currentPage}
                            onChange={handleChange}
                        />
                    </Stack>

                    {/*{*/}
                    {/*    pages.map((pageNumber, i) => {*/}
                    {/*        return (*/}
                    {/*            <li key={i} onClick={() => onClickHandler(pageNumber)}*/}
                    {/*                className={`${s.pagination__item}*/}
                    {/*                ${props.currentPage === pageNumber && s.selectedPage}`}>*/}
                    {/*                {pageNumber}*/}
                    {/*            </li>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                </ul>
            </div>
            {props.users.map(item => {
                return (
                    <div className={s.userContent} key={item.id}>

                        <div className={s.leftContent}>
                            <NavLink to={`/profile/${item.id}`} className={s.navLink}>
                                <img className={s.img} src={item.photos.small ? item.photos.small : UserDefaultIcon}
                                     alt=""/>
                            </NavLink>
                            {item.followed ?
                                <button disabled={props.followingInProgress.some(id => id === item.id)} onClick={() => {
                                    props.unFollow(false, item.id)
                                }}>Unfollow</button>
                                :
                                <button disabled={props.followingInProgress.some(id => id === item.id)} onClick={() => {
                                    props.follow(true, item.id)
                                }}>Follow</button>
                            }
                        </div>

                        <div className={s.content}>
                            <div className={s.row}>
                                <h2 className={s.userName}>
                                    {item.name}
                                </h2>
                                <div className={s.location}>
                                    <span className={s.city}>
                                    </span>
                                    <span className={s.city}>
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
})