import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ApiMessage,
  AuthApi,
  AuthApiConfig,
  LoginModel, LoginSuccessModel,
  RegistrationModel
} from '../../api/Methods/AuthApi'
import validator from 'validator'
import { UserDataModel } from './types'
import { userInfoActions } from './index'
import { NameRegularExpression } from '../../common/common'
import { configActions, initialLoaderState } from '../ConfigReducer'
import { AppState } from '../index'

export const UserInfoMethods = {
  registration: createAsyncThunk<any, RegistrationModel, any>( '/saveUser', async ( data, thunkAPI ) => {
    const dispatch = thunkAPI.dispatch
    dispatch( configActions.setLoader( {
      isActive: true,
      message: 'Происходит регистрация пользователя, пожалуйста подождите...'
    } ) )
    const email = validator.isEmail( data.email )
    const name = NameRegularExpression.test( data.name )
    const surname = NameRegularExpression.test( data.surname )
    const password = validator.isLength( data.password, { min: 8, max: 32 } )
    const confirmPassword = validator.isLength( data.confirmPassword, { min: 8, max: 32 } )
    const passwordEquality = password === confirmPassword

    if( email && password && confirmPassword && passwordEquality && name && surname ) {
      const response = await AuthApi.registration( data )
      if( response.status === 200 ) {
        dispatch( userInfoActions.saveEmail( data.email ) )
      } else {
        return thunkAPI.rejectWithValue( response.data.message ), dispatch( configActions.setLoader( initialLoaderState ) )
      }

      return thunkAPI.fulfillWithValue( 'Регистрация пользователя успешно завершена!' ), dispatch( configActions.setLoader( initialLoaderState ) ), dispatch( configActions.setLoader( initialLoaderState ) )
    } else {
      if( !name ) {
        return thunkAPI.rejectWithValue( 'Некорректное имя пользователя' ), dispatch( configActions.setLoader( initialLoaderState ) )
      }

      if( !surname ) {
        return thunkAPI.rejectWithValue( 'Некорректная фамилия пользователя' ), dispatch( configActions.setLoader( initialLoaderState ) )
      }

      if( !email ) {
        return thunkAPI.rejectWithValue( 'Указанный при регистрации Email-адрес невалидный.' ), dispatch( configActions.setLoader( initialLoaderState ) )
      }

      if( !passwordEquality ) {
        return thunkAPI.rejectWithValue( 'Указанные "Пароль" и "Подтверждающий пароль" не совпадают.' ), dispatch( configActions.setLoader( initialLoaderState ) )
      }

      if( !password || !confirmPassword ) {
        const { minLength, maxLength } = AuthApiConfig.password
        const messageKeyWord = !password ? 'Пароль' : 'Подтверждающий пароль'
        return thunkAPI.rejectWithValue( `Указанный ${messageKeyWord.toLowerCase()} не подходит. ${messageKeyWord} должен быть не короче ${minLength} и не длиннее ${maxLength} символов!` ), dispatch( configActions.setLoader( initialLoaderState ) )
      }

      return thunkAPI.rejectWithValue( 'not valid' ), dispatch( configActions.setLoader( initialLoaderState ) )
    }
  } ),
  login: createAsyncThunk<any, LoginModel, any>( '/loginUser', async ( data, thunkAPI ) => {
    const dispatch = thunkAPI.dispatch
    dispatch( configActions.setLoader( {
      isActive: true,
      message: 'Выполняем вход в систему...'
    } ) )
    const { email, password } = data
    const emailValidate = validator.isEmail( email )
    const passwordValidate = validator.isLength( password, {
      min: AuthApiConfig.password.minLength,
      max: AuthApiConfig.password.maxLength
    } )

    if( emailValidate && passwordValidate ) {
      const response = await AuthApi.login( data )
      if( response.status === 200 && 'userData' in response.data ) {
        const data: UserDataModel = response.data.userData
        dispatch( userInfoActions.saveUser( data ) )

        return thunkAPI.fulfillWithValue( 'Вы успешно авторизовались!' ), dispatch( configActions.setLoader( initialLoaderState ) )
      } else {
        response.data = response.data as unknown as ApiMessage
        return thunkAPI.rejectWithValue( response.data.message ), dispatch( configActions.setLoader( initialLoaderState ) )
      }


    } else {
      if( !emailValidate ) {
        return thunkAPI.rejectWithValue( 'Указан невалидный Email-адрес' ), dispatch( configActions.setLoader( initialLoaderState ) )
      }

      if( !passwordValidate ) {
        const { minLength, maxLength } = AuthApiConfig.password
        const messageKeyWord = !password ? 'Пароль' : 'Подтверждающий пароль'
        return thunkAPI.rejectWithValue( `Указанный ${messageKeyWord.toLowerCase()} не подходит. ${messageKeyWord} должен быть не короче ${minLength} и не длиннее ${maxLength} символов!` ), dispatch( configActions.setLoader( initialLoaderState ) )
      }

      return thunkAPI.rejectWithValue( 'Email-адрес или пароль - невалидные' ), dispatch( configActions.setLoader( initialLoaderState ) )
    }
  } ),
  checkSession: createAsyncThunk<any, any, any>( 'checkSession', async ( data, thunkAPI ) => {
    const dispatch = thunkAPI.dispatch
    dispatch( configActions.setLoader( {
      isActive: true,
      message: 'Проверка сессии пользователя...'
    } ) )
    const response = await AuthApi.checkSession()

    if( response.status === 200 && 'userData' in response.data ) {
      response.data = response.data as LoginSuccessModel
      dispatch( userInfoActions.saveUser( response.data.userData ) )
      dispatch( configActions.setLoader( initialLoaderState ) )
      return thunkAPI.fulfillWithValue( 'ok' )
    } else {
      response.data = response.data as ApiMessage
      dispatch( configActions.setLoader( initialLoaderState ) )
      return thunkAPI.rejectWithValue( response.data.message )
    }
  } ),
  logout: createAsyncThunk<any, unknown, any>( 'logout', async ( data = {}, thunkAPI ) => {
    const dispatch = thunkAPI.dispatch
    const state: AppState = thunkAPI.getState() as AppState

    if( !state.userInfo.isAuth ) {
      return thunkAPI.rejectWithValue( 'Пользователь не авторизован!' )
    }

    dispatch( configActions.setLoader( {
      isActive: true,
      message: 'Завершаем сеанс пользователя...'
    } ) )

    const response = await AuthApi.logout()

    if( response.status === 200 ) {
      dispatch( userInfoActions.logout() )
      dispatch( configActions.setLoader( initialLoaderState ) )
      return thunkAPI.fulfillWithValue( 'ok' )
    } else {
      return thunkAPI.rejectWithValue( response.data.message )
    }
  } )
}