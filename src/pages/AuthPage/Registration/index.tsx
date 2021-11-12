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
import { AuthType } from '../AuthPage'
import { useHistory } from 'react-router'
import { userInfoActions } from '../../../reducers/UserReducer'
import { UserInfoMethods } from '../../../reducers/UserReducer/thunk'

interface RegistrationFormModel {
  name: FieldStateProps,
  surname: FieldStateProps,
  email: FieldStateProps,
  password: FieldStateProps,
  confirmPassword: FieldStateProps
}

interface FieldStateProps {
  dirty: boolean,
  value: string,
  message: string,
  status: StatusType
}

type FormInputNames = keyof RegistrationFormModel

export const RegistrationSection: React.FC<RegistrationSectionProps> = ( { formTitle } ) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const initialFieldState: FieldStateProps = {
    dirty: false,
    value: '',
    message: '',
    status: 'insipid'
  }
  const [state, setState] = useState<RegistrationFormModel>( {
    name: initialFieldState,
    surname: initialFieldState,
    email: initialFieldState,
    password: initialFieldState,
    confirmPassword: initialFieldState
  } )
  const [submit, setSubmit] = useState<boolean>( false )

  const blurHandler = async ( input: FormInputNames, value: string ) => {
    if( input === 'name' || input === 'surname' ) {
      setState( prev => {
        const regExpResult = NameRegularExpression.test( value )
        const isLength = value.length >= 2 && value.length <= 64
        const status: StatusType = regExpResult && isLength ? 'correct' : value.length > 0 || prev.name.dirty ? 'incorrect' : 'insipid'
        return {
          ...prev,
          [ input ]: {
            message: status === 'incorrect' ? 'Указано невалидное имя' : '',
            status,
            value,
            dirty: true
          }
        }
      } )
    } else if( input === 'email' ) {
      setState( prev => {
        const result = validator.isEmail( value )
        const status: StatusType = result ? 'correct' : value.length > 0 || prev.email.dirty ? 'incorrect' : 'insipid'
        return {
          ...prev,
          email: {
            message: status === 'incorrect' ? 'Указан невалидный email-адрес' : '',
            status,
            value,
            dirty: true
          }
        }
      } )
    } else if( input === 'password' || input === 'confirmPassword' ) {
      setState( prev => {
        const isLength = validator.isLength( value, { min: 8, max: 32 } )
        let status: StatusType = isLength ? 'correct' : value.length > 0 || prev[ input ].dirty ? 'incorrect' : 'insipid'
        let message: string = status === 'incorrect' ? 'Пароль должен быть не короче 8 и не длиннее 32 символов' : ''

        if( input === 'confirmPassword' && isLength ) {
          if( prev.password.status === 'correct' ) {
            status = value === prev.password.value ? 'correct' : 'incorrect'
            message = status === 'incorrect' ? 'Пароли не совпадают' : ''
          }
        }

        return {
          ...prev,
          [ input ]: {
            status,
            message,
            value,
            dirty: true
          }
        }
      } )
    }
  }

  const changeModeHandler = ( mode: AuthType ) => {
    if( mode === 'login' ) {
      history.push( '/auth/login' )
    } else if( mode === 'forgot-password' ) {
      history.push( '/auth/forgot-password' )
    }
  }

  const submitHandler = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    dispatch( UserInfoMethods.registration( {
      name: state.name.value,
      surname: state.surname.value,
      email: state.email.value,
      password: state.password.value,
      confirmPassword: state.confirmPassword.value
    } ) )
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

      <Divider text={'или'}/>

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