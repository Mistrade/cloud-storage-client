import style from './mainInputStyle.module.sass'
import React, { useState } from 'react'
import { Label } from './Label'
import { MainInputProps } from './types'

export const MainInput: React.FC<MainInputProps> = ( {
                                                       labelConfig,
                                                       inputType,
                                                       errorMessage,
                                                       onBlur,
                                                       onFocus,
                                                       status,
                                                       isRequired
                                                     } ) => {
  const [value, setValue] = useState<string>( '' )
  const [type, setType] = useState<typeof inputType>( inputType )

  const changeHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setValue( e.target.value )
  }

  const setClassName = (): string => {
    if( status === 'correct' ) {
      return `${style.input} ${style.inputSuccess}`
    } else if( status === 'incorrect' ) {
      return `${style.input} ${style.inputError}`
    } else {
      return style.input
    }
  }

  const togglePasswordVision = () => {
    setType( prev => {
      if( inputType === 'password' && type === 'password' ) {
        return 'text'
      } else if( inputType === 'password' && type !== 'password' ) {
        return 'password'
      } else {
        return prev
      }
    } )
  }

  const blurHandler = ( e: React.FocusEvent<HTMLInputElement> ) => {
    onBlur && onBlur( e, value )
  }

  const focusHandler = ( e: React.FocusEvent<HTMLInputElement> ) => {
    onFocus && onFocus( e, value )
  }

  return (
    <div className={style.inputContainer}>
      <Label {...labelConfig} inputIsRequired={isRequired}/>
      <div className={style.inputWrapper}>
        <input
          name={Date.now().toString()}
          autoComplete={'none'}
          type={type || 'text'}
          className={setClassName()}
          value={value}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onChange={( e: React.ChangeEvent<HTMLInputElement> ) => changeHandler( e )}
        />
        {inputType === 'password' && value?.length > 0 ? (
          <span className={style.showPassword} onClick={togglePasswordVision}>
            {type === 'password' ? 'показать' : 'скрыть'}
          </span>
        ) : <></>}
      </div>
      {status === 'incorrect' && errorMessage ? (
        <span className={style.errorMessage}>
          {errorMessage}
        </span>
      ) : <></>}

    </div>
  )
}