import React from "react";
import s from './Users.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {followAC, setUsersAC, unFollowAC, UsersType} from "../../../redux/users-reducer";
import axios from "axios";

type PropsType = {}

export const Users = (props: PropsType) => {

    const users = useSelector<AppRootStateType, Array<UsersType>>(state => state.usersReducer.users);

    const dispatch = useDispatch();

    const getUsers = () => {
        if (users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                dispatch(setUsersAC(response.data.items));
            });
        }
    }

    return (
        <div className={s.users}>
            <button onClick={getUsers}>getUsers</button>
            {users.map(item => {
                return (
                    <div className={s.userContent} key={item.id}>
                        <div className={s.leftContent}>
                            <img className={s.img} src={item.photos.small ? item.photos.small : 'no photo'} alt=""/>
                            {/*<button onClick={}>{item.isFollowed ? 'Follow' : 'Unfollow'}</button>*/}
                            {item.followed ?
                                <button onClick={() => {
                                    dispatch(unFollowAC(false, item.id))
                                }}>Follow</button>
                                :
                                <button onClick={() => {
                                    dispatch(followAC(true, item.id))
                                }}>Unfollow</button>}
                        </div>

                        <div className={s.content}>
                            <div className={s.row}>
                                <h2 className={s.userName}>
                                    {item.name}
                                </h2>
                                <div className={s.location}>
                                    <span className={s.city}>
                                        {'item.location.city'},
                                    </span>
                                    <span className={s.city}>
                                        {'item.location.country'}
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