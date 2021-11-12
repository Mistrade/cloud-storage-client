import React from 'react'
import style from './style.module.sass'
import { DividerProps } from './types'

export const Divider: React.FC<DividerProps> = ( { text } ) => {
  return (
    <div className={style.divider}>
      {text ? (
        <>
          <div className={style.line}></div>
          <span className={style.dividerDescription}>
            {text}
          </span>
          <div className={style.line}></div>
        </>
      ) : (
        <div className={style.line}></div>
      )}

    </div>
  )
}