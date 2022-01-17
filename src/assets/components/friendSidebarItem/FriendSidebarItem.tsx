import React, {useCallback, useEffect} from "react";
import s from './FriendSidebarItem.module.scss';
import {FriendsSectionType, friendsSidebarTC} from "../../../redux/sidebar-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {getUsersThunkCreator, UsersType} from "../../../redux/users-reducer";
import UserDefaultIcon from '../../images/userDefault.png'
import {NavLink} from "react-router-dom";
import {LinearProgress} from "@mui/material";

type PropsType = {}

export const FriendSidebarItem = (props: PropsType) => {

    const dispatch = useDispatch();
    const friends = useSelector<AppRootStateType, Array<UsersType>>(state => state.sidebarReducer.friends);
    const totalFriendsCount = useSelector<AppRootStateType, number>(state => state.sidebarReducer.totalUsersCount);
    const pageSize = useSelector<AppRootStateType, number>(state => state.sidebarReducer.pageSize);
    const pagesCount = Math.ceil(totalFriendsCount / pageSize);
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.sidebarReducer.isLoading);


    const getRandomIntInclusive = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }

    useEffect(() => {
        dispatch(friendsSidebarTC(getRandomIntInclusive(1, pagesCount), 20))
    }, [pagesCount])

   const onClickHandler = () => {
       dispatch(friendsSidebarTC(getRandomIntInclusive(1, pagesCount), 20))
   }

if(isLoading){
    return <LinearProgress/>
}else {
    return (
        <ul className={s.friendList}>
            {friends.map(f => {
                friends.length = 3;
                return (
                    <NavLink key={f.id} to={`/profile/${f.id}`} className={s.friendItem}>
                        <img className={s.img} src={f.photos.small ? f.photos.small : UserDefaultIcon}
                             alt="Friends Photo"/>
                        <span className={s.name}>{f.name}</span>
                    </NavLink>
                )
            })}
            <button onClick={onClickHandler}>Other</button>
        </ul>
    )
}
}