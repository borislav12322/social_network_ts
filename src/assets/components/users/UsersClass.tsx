import React from "react";
import s from './Users.module.scss';
import {ActionUsersType, followAC, setUsersAC, unFollowAC, UsersType} from "../../../redux/users-reducer";
import axios from "axios";

type UsersClassType = {
    users: Array<UsersType>
    dispatch: (ac: ActionUsersType) => ActionUsersType
}

class UsersClass extends React.Component<UsersClassType> {

    constructor(props: UsersClassType) {
        super(props);
        if (this.props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                this.props.dispatch(setUsersAC(response.data.items));
            });
        }

    }

    // getUsers = () => {
    //     if (this.props.users.length === 0) {
    //         axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
    //             this.props.dispatch(setUsersAC(response.data.items));
    //         });
    //     }
    // }

    render() {
        return (
            <div className={s.users}>
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