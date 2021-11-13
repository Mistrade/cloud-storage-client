import React from 'react'
import style from './style.module.sass'
import { PreloaderProps } from './types'

export const Preloader: React.FC<PreloaderProps> = ({message}) => {
  return (
    <div className={style.preloader}>
      <div className={style.preloaderContentContainer}>
        <div className={style.loader}>

        </div>
        <div className={style.preloaderMessageContainer}>
          <span className={style.preloaderMessage}>
            {message}
          </span>
        </div>
      </div>
    </div>
  )
}