import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    FocusEvent,
    useEffect,
    useState
} from "react";
import s from './ProfileStatus.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {changeEditModeStatusAC, updateProfileStatusTC} from "../../../redux/profile-reducer";
import {useParams} from "react-router-dom";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type PropsType = DefaultInputPropsType & {}

export const ProfileStatus = ({onChange, ...props}: PropsType) => {

    const dispatch = useDispatch();
    let profileStatus = useSelector<AppRootStateType, string | null>(state => state.profileReducer.status);
    let editModeStatus = useSelector<AppRootStateType, boolean>(state => state.profileReducer.editModeStatus);
    const myID = useSelector<AppRootStateType, number | null>(state => state.authReducer.id);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [value, setValue] = useState<string | null>(profileStatus);

    let {id} = useParams();

    useEffect(() => {
        setValue(profileStatus)
    }, [profileStatus]);

    const onClickHandler = () => {
        if (id == myID?.toString()) {
            // setEditMode(true);
            dispatch(changeEditModeStatusAC(true))
        }
    };

    const onBlurHandler = (e: FocusEvent<HTMLDivElement, Element>) => {
        // setEditMode(false);
        // dispatch(changeEditModeStatusAC(false))
        // if(e.currentTarget.className !== `${s.statusRow}`){
        //     dispatch(changeEditModeStatusAC(false))
        // }
        setTimeout(() => {
            dispatch(changeEditModeStatusAC(false))
        }, 500)
    };

    const onButtonClickHandler = () => {
        dispatch(updateProfileStatusTC(value))
        // setEditMode(false);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        setValue(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // setEditMode(false);
            dispatch(changeEditModeStatusAC(false))
            dispatch(updateProfileStatusTC(value))
        }
    }

    return (
        <div className={s.statusRow}>
            {!editModeStatus ? <span className={s.statusText} onClick={() => onClickHandler()}>
                {profileStatus ? profileStatus : 'No status'}

            </span> : <div className={s.inputRow} onBlur={onBlurHandler}><input value={value || ''}
                                                                                onKeyPress={onKeyPressHandler} autoFocus
                                                                                onChange={onChangeHandler}/>
                <button className={s.buttonSend} onClick={onButtonClickHandler}>Send</button>
            </div>}

        </div>
    )
}