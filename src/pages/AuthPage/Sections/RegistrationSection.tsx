import React, { useEffect, useState } from 'react'
import { MainInput } from '../../../components/Inputs/MainInput'
import style from './style.module.sass'
import { RegistrationSectionProps } from './types'
import { useAppDispatch, useAppSelector } from '../../../reducers'
import { StatusType } from '../../../components/Inputs/types'
import { NameRegularExpression } from '../../../common/common'
import validator from 'validator'
import { Button, ButtonGroup } from '../../../components/Button'
import { Divider } from '../../../components/Divider'
import { Link } from 'react-router-dom'
import { AuthInitialStateConfig, AuthType } from '../AuthPage'
import { useHistory } from 'react-router'
import { userInfoActions } from '../../../reducers/UserReducer'
import { UserInfoMethods } from '../../../reducers/UserReducer/thunk'


export const RegistrationSection: React.FC<RegistrationSectionProps> = ( {
                                                                           formTitle,
                                                                           blurHandler,
                                                                           state,
                                                                           setState,
                                                                           changeModeHandler
                                                                         } ) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [submit, setSubmit] = useState<boolean>( false )

  const submitHandler = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    dispatch( UserInfoMethods.registration( {
      name: state.name.value,
      surname: state.surname.value,
      email: state.email.value,
      password: state.password.value,
      confirmPassword: state.confirmPassword.value
    } ) )
    history.push( '/auth/login' )
  }

  useEffect( () => {
    const valid = Object.values( state ).every( ( item ) => item.status === 'correct' )
    setSubmit( valid )
  }, [state] )

  return (
    <form onSubmit={( e ) => submitHandler( e )} className={style.formContainer}>

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
        onBlur={( e, value ) => blurHandler( 'name', value )}
        isRequired={true}
        status={state.name.status}
        errorMessage={state.name.message}
        labelConfig={{
          text: 'Имя пользователя'
        }}
      />
      <MainInput
        onBlur={( e, value ) => blurHandler( 'surname', value )}
        isRequired={true}
        status={state.surname.status}
        errorMessage={state.surname.message}
        labelConfig={{
          text: 'Фамилия пользователя'
        }}
      />
      <MainInput
        onBlur={( e, value ) => blurHandler( 'email', value )}
        status={state.email.status}
        errorMessage={state.email.message}
        isRequired={true}
        inputType={'email'}
        labelConfig={{
          text: 'Email-адрес для входа в систему'
        }}
      />
      <MainInput
        onBlur={( e, value ) => blurHandler( 'password', value )}
        isRequired={true}
        status={state.password.status}
        errorMessage={state.password.message}
        inputType={'password'}
        labelConfig={{
          text: 'Пароль для входа в систему'
        }}
      />
      <MainInput
        onBlur={( e, value ) => blurHandler( 'confirmPassword', value )}
        isRequired={true}
        status={state.confirmPassword.status}
        errorMessage={state.confirmPassword.message}
        inputType={'password'}
        labelConfig={{
          text: 'Подтвердите пароль для входа в систему'
        }}
      />
      <ButtonGroup
        justifyButtons={'center'}
        alignButtons={'center'}
        wrap={'nowrap'}
        buttonGroupStyle={{ marginTop: 12, marginBottom: 24 }}
      >
        <Button
          isDisabled={!submit}
          htmlType={'submit'}
          text={'Регистрация'}
          type={'main'}
          onClick={( e ) => ''}
        />
      </ButtonGroup>

      <Divider text={'Или'}/>

      <ButtonGroup
        justifyButtons={'space-evenly'}
        alignButtons={'center'}
        wrap={'nowrap'}
        buttonGroupStyle={{ marginTop: 24 }}
      >
        <Button
          text={'Войти в систему'}
          htmlType={'button'}
          type={'main'}
          onClick={() => changeModeHandler( 'login' )}
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