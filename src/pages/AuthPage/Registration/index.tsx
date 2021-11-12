import React from 'react'
import { MainInput } from '../../../components/Inputs/MainInput'
import style from './style.module.sass'
import { RegistrationSectionProps } from './types'


export const RegistrationSection: React.FC<RegistrationSectionProps> = ( { formTitle } ) => {

  return (
    <form onSubmit={( e ) => e.preventDefault()} className={style.formContainer}>

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
        isRequired={true}
        status={'insipid'}
        errorMessage={''}
        labelConfig={{
          text: 'Имя пользователя'
        }}
      />
      <MainInput
        isRequired={true}
        status={'insipid'}
        errorMessage={''}
        labelConfig={{
          text: 'Фамилия пользователя'
        }}
      />
      <MainInput
        isRequired={true}
        status={'insipid'}
        errorMessage={''}
        inputType={'email'}
        labelConfig={{
          text: 'Email-адрес для входа в систему'
        }}
      />
      <MainInput
        isRequired={true}
        status={'insipid'}
        errorMessage={''}
        inputType={'password'}
        labelConfig={{
          text: 'Пароль для входа в систему'
        }}
      />
      <MainInput
        isRequired={true}
        status={'insipid'}
        errorMessage={''}
        inputType={'password'}
        labelConfig={{
          text: 'Подтвердите пароль для входа в систему'
        }}
      />
      <button type={'submit'}>
        Регистрация
      </button>
    </form>
  )
}