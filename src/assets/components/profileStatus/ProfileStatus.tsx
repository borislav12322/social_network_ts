import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useEffect, useState} from "react";
import s from './ProfileStatus.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {updateProfileStatusTC} from "../../../redux/profile-reducer";
import {useParams} from "react-router-dom";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type PropsType = DefaultInputPropsType & {}

export const ProfileStatus = ({onChange, ...props}: PropsType) => {

    const dispatch = useDispatch();
    let profileStatus = useSelector<AppRootStateType, string | null>(state => state.profileReducer.status);
    const myID = useSelector<AppRootStateType, number | null>(state => state.authReducer.id);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [value, setValue] = useState<string | null>(profileStatus);

    let {id} = useParams();

    useEffect(() => {
        setValue(profileStatus)
    }, [profileStatus]);

    const onDoubleClickHandler = () => {
        if (id == myID?.toString()) {
            setEditMode(true);
        }
    };

    const onBlurHandler = () => {
        setEditMode(false);
        dispatch(updateProfileStatusTC(value))
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        setValue(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false);
            dispatch(updateProfileStatusTC(value))
        }
    }

    return (
        <div className={s.statusRow}>
            {!editMode ? <span className={s.statusText} onDoubleClick={() => onDoubleClickHandler()}>
                {profileStatus ? profileStatus : 'No status'}

            </span> : <input value={value || ''} onKeyPress={onKeyPressHandler} onBlur={onBlurHandler} autoFocus
                             onChange={onChangeHandler}/>}
        </div>
    )
}