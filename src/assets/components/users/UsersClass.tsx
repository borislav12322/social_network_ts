import React, {useEffect, useMemo, useState} from "react";
import s from "./Users.module.scss";
import {changePageThunkCreator, UsersType} from "../../../redux/users-reducer";
import {NavLink, useNavigate} from "react-router-dom";
import UserDefaultIcon from '../../images/userDefault.png'
import {Pagination, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
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
    changePageSize: (value: number) => void
}

export const UsersClass = React.memo((props: PropsType) => {

    const dispatch = useDispatch();
    let pageSizeInitValue = useSelector<AppRootStateType, number>(state => state.usersReducer.pageSize);
    let [page, setPage] = useState<number>(1);
    let [pageSize, setPageSize] = useState<number>(pageSizeInitValue);
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

    const onClickHandler = () => {
        // setPage(page = page + 1)
        // setPageSize(pageSize = pageSize + pageSizeInitValue)
        // dispatch(changePageThunkCreator(page, pageSize))
    }

    return (

        <div className={s.users}>
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
            <button onClick={onClickHandler} className={s.moreBtn}>Show more</button>
        </div>
    )
})