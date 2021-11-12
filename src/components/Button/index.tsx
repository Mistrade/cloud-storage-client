import React, { memo } from 'react'
import { ButtonGroupProps, ButtonProps } from './types'
import style from './style.module.sass'

export const Button: React.FC<ButtonProps> = memo( ( {
                                                       children,
                                                       text,
                                                       className,
                                                       buttonStyle,
                                                       htmlType,
                                                       type,
                                                       onClick,
                                                       isDisabled
                                                     } ) => {

  return (
    <button disabled={isDisabled} className={style.button || className} type={htmlType} onClick={onClick}>
      {text || children}
    </button>
  )
} )

export const ButtonGroup: React.FC<ButtonGroupProps> = ( {
                                                           children,
                                                           buttonGroupStyle,
                                                           justifyButtons,
                                                           alignButtons,
                                                           wrap
                                                         } ) => {

  return (
    <div style={{
      ...buttonGroupStyle,
      width: '100%',
      display: 'flex',
      justifyContent: justifyButtons,
      alignItems: alignButtons,
      flexWrap: wrap
    }}>
      {children}
    </div>
  )
}