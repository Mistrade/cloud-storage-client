import style from './style.module.sass'
import React, { useEffect, useState } from 'react'
import { RegistrationSectionProps } from './types'
import { MainInput } from '../../../components/Inputs/MainInput'
import { Button, ButtonGroup } from '../../../components/Button'
import { Divider } from '../../../components/Divider'
import { useAppDispatch } from '../../../reducers'
import { UserInfoMethods } from '../../../reducers/UserReducer/thunk'

export const AuthSection: React.FC<RegistrationSectionProps> = ( {
                                                                   formTitle,
                                                                   state,
                                                                   setState,
                                                                   blurHandler,
                                                                   children,
                                                                   changeModeHandler
                                                                 } ) => {
  const dispatch = useAppDispatch()
  const [submit, setSubmit] = useState<boolean>( false )

  useEffect( () => {
    if( state.email.status === 'correct' && state.password.status === 'correct' ) {
      setSubmit( true )
    } else {
      setSubmit( false )
    }
  }, [state] )

  const submitHandler = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    dispatch( UserInfoMethods.login( {
      email: state.email.value,
      password: state.password.value
    } ) )
  }

  return (
    <form className={style.formContainer} onSubmit={submitHandler}>

      {formTitle ? (
        <>
          {typeof formTitle === 'string' ? (
            <h2 className={style.formTitle}>
              {formTitle}
            </h2>
          ) : formTitle}
        </>
      ) : <></>}

      <MainInput
        labelConfig={{ text: 'Укажите ваш Email' }}
        status={state.email.status}
        errorMessage={state.email.message}
        isRequired={true}
        inputType={'email'}
        onBlur={( e, value ) => blurHandler( 'email', value )}
      />
      <MainInput
        labelConfig={{ text: 'Укажите пароль от вашего аккаунта' }}
        inputType={'password'}
        status={state.password.status}
        errorMessage={state.password.message}
        isRequired={true}
        onBlur={( e, value ) => blurHandler( 'password', value )}
      />
      <ButtonGroup
        alignButtons={'center'}
        justifyButtons={'center'}
        buttonGroupStyle={{ margin: '24px 0px' }}
      >
        <Button isDisabled={!submit} type={'main'} text={'Войти в систему'} htmlType={'submit'}/>
      </ButtonGroup>

      <Divider text={'Или'}/>

      <ButtonGroup
        justifyButtons={'space-evenly'}
        alignButtons={'center'}
        wrap={'nowrap'}
        buttonGroupStyle={{ marginTop: 24 }}
      >
        <Button
          text={'Регистрация'}
          htmlType={'button'}
          type={'main'}
          onClick={() => changeModeHandler( 'registration' )}
        />
        <Button
          text={'Сбросить пароль'}
          htmlType={'button'}
          type={'main'}
          onClick={() => changeModeHandler( 'forgot-password' )}
        />
      </ButtonGroup>
    </form>
  )
}