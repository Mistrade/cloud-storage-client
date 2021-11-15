import React, { useEffect, useState } from 'react'
import style from './style.module.sass'
import { MainInput } from '../../components/Inputs/MainInput'
import { RegistrationSection } from './Sections/RegistrationSection'
import { RouteComponentProps, useHistory, withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { Wrapper } from '../../components/Wrapper'
import { NameRegularExpression } from '../../common/common'
import { StatusType } from '../../components/Inputs/types'
import validator from 'validator'
import { AuthSection } from './Sections/AuthSection'
import { useAppDispatch, useAppSelector } from '../../reducers'
import { ConfirmPasswordSection } from './Sections/ConfirmPassword'

export type AuthType = 'login' | 'registration' | 'forgot-password' | 'confirm-password'

export interface RegistrationFormModel {
  name: FieldStateProps,
  surname: FieldStateProps,
  email: FieldStateProps,
  password: FieldStateProps,
  confirmPassword: FieldStateProps
}

export interface FieldStateProps {
  dirty: boolean,
  value: string,
  message: string,
  status: StatusType
}

export type FormInputNames = keyof RegistrationFormModel

const initialFieldState: FieldStateProps = {
  dirty: false,
  value: '',
  message: '',
  status: 'insipid'
}

export const AuthInitialStateConfig = {
  name: initialFieldState,
  surname: initialFieldState,
  email: initialFieldState,
  password: initialFieldState,
  confirmPassword: initialFieldState

}

const AuthPage: React.FC<RouteComponentProps<{ mode: AuthType }>> = ( { match } ) => {
  const [mode, setMode] = useState<AuthType>( match.params.mode )
  const history = useHistory()
  const isAuth = useAppSelector( state => state.userInfo.isAuth )
  const [state, setState] = useState<RegistrationFormModel>( AuthInitialStateConfig )
  const reason = useAppSelector(state => state.userInfo.error)


  useEffect(() => {
    if(reason){
      setMode('confirm-password')
    }
  }, [reason])

  useEffect( () => {
    if( isAuth ) {
      resetStateAndPushToURL('/work-space')
    }
  }, [isAuth] )

  useEffect( () => {
    resetStateAndPushToURL('/auth/' + mode)
  }, [mode] )

  const resetStateAndPushToURL = (url: string) => {
    history.push( url )
    setState( AuthInitialStateConfig )
  }

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
    setMode( mode )
  }

  return (
    <Wrapper justifyBody={'center'} sectionStyle={{ marginTop: '10vh' }}>
      <Switch>
        <Route path={'/auth/registration'} exact={true}>
          <RegistrationSection
            formTitle={'Регистрация пользователя'}
            blurHandler={blurHandler}
            state={state}
            setState={setState}
            changeModeHandler={changeModeHandler}
          />
        </Route>
        <Route path={'/auth/forgot-password'} exact={true}>

        </Route>
        <Route path={'/auth/login'} exact={true}>
          <AuthSection
            formTitle={'Вход в систему'}
            blurHandler={blurHandler}
            state={state}
            setState={setState}
            changeModeHandler={changeModeHandler}
          />
        </Route>
        <Route path={'/auth/confirm-password'}>
          <ConfirmPasswordSection
            blurHandler={blurHandler}
            state={state}
            setState={setState}
            changeModeHandler={changeModeHandler}
          />
        </Route>
      </Switch>
    </Wrapper>
  )
}

export default withRouter( AuthPage )