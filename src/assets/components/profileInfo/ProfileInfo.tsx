import React from "react";
import s from './ProfileInfo.module.scss';

type PropsType = {
    photo: string
    name: string
    birthday: string
    city: string
    education: string
    website: string
}

export const ProfileInfo = ({photo, name, birthday, city, education, website, ...props}: PropsType) => {
    return (
        <div className={s.profileInfo}>
            <img className={s.profileImg} src={photo} alt="photo"/>
            <div className={s.contentBox}>
                <h2 className={s.name}>
                    {name}
                </h2>
                <ul className={s.dataList}>
                    <li className={s.dataItem}>
                        <span className={s.templateText}>Date of Birth: </span>
                        <span className={s.propsData}>{birthday}</span>
                    </li>

                    <li className={s.dataItem}>
                        <span className={s.templateText}>City: </span>
                        <span className={s.propsData}>{city}</span>
                    </li>

                    <li className={s.dataItem}>
                        <span className={s.templateText}>Education: </span>
                        <span className={s.propsData}>{education}</span>
                    </li>

                    <li className={s.dataItem}>
                        <span className={s.templateText}>
                            Web Site:
                        </span>
                        <a className={s.propsData} href={website} target={'_blank'}>borislav-web.ru</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}