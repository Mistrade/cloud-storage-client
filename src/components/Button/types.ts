import React, { CSSProperties } from 'react'

export interface ButtonProps {
  type: 'main' | 'action' | 'escape'
  text: string,
  className?: string,
  buttonStyle?: CSSProperties,
  htmlType: "button" | "submit" | "reset" | undefined,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any,
  isDisabled?: boolean
}

export interface ButtonGroupProps {
  justifyButtons?: CSSProperties['justifyContent'],
  alignButtons?: CSSProperties['alignItems'],
  wrap?: CSSProperties['flexWrap'],
  buttonGroupStyle?: CSSProperties,
}