import React, { useEffect } from 'react'
import { MainInput } from '../../../components/Inputs/MainInput'
import { RegistrationSectionProps } from './types'
import { useAppDispatch, useAppSelector } from '../../../reducers'
import style from './style.module.sass'
import { Button, ButtonGroup } from '../../../components/Button'
import { UserInfoMethods } from '../../../reducers/UserReducer/thunk'
import { userInfoActions } from '../../../reducers/UserReducer'
import { useHistory } from 'react-router'

export const ConfirmPasswordSection: React.FC<RegistrationSectionProps> = ( {
                                                                              changeModeHandler,
                                                                              blurHandler,
                                                                              children,
                                                                              state,
                                                                              setState,
                                                                              formTitle
                                                                            } ) => {
  const dispatch = useAppDispatch()
  const reason = useAppSelector( state => state.userInfo.error )
  const history = useHistory()

  useEffect( () => {
    return () => {
      dispatch( userInfoActions.setConfirmPasswordInfo( null ) )
    }
  }, [] )

  return (
    <form
      className={style.formContainer}
      onSubmit={( e ) => {
        e.preventDefault()
        dispatch( UserInfoMethods.resolveConflict( {
          userId: reason?.userId || '',
          password: state.password.value,
          type: reason?.type || null
        } ) )
      }}
    >
      <h1 className={style.formTitle}>Пожалуйста, подтвердите пароль!</h1>
      {reason?.message ? (
        <p className={style.formDescription}>
          {reason.message}
        </p>
      ) : <></>}
      <MainInput
        labelConfig={{
          text: 'Подтвердите пароль от вашей учетной записи'
        }}
        onBlur={( e, value ) => blurHandler( 'password', value )}
        status={state.password.status}
        errorMessage={state.password.message}
        isRequired={true}
        inputType={'password'}
      />
      <ButtonGroup justifyButtons={'center'}>
        <Button type={'main'} text={'Подтвердить'} htmlType={'submit'}/>
      </ButtonGroup>
    </form>
  )
}