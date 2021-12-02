import React from "react";
import s from "./Preloader.module.scss";

type PropsType ={

}

export const Preloader = () => {
  return(
      <div className={s.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
  )
}