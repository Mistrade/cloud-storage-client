import React from 'react'
import style from './style.module.sass'
import { WrapperProps } from './types'

export const Wrapper: React.FC<WrapperProps> = ( { children, justifyBody, sectionStyle } ) => {

  return (
    <section className={style.wrapper} style={sectionStyle}>
      <div
        className={style.wrapperBody}
        style={{
          justifyContent: justifyBody || 'flex-start'
        }}
      >
        {children}
      </div>
    </section>
  )
}