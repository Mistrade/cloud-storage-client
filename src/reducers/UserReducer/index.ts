import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDataModel, UserInfoModel } from './types'
import validator from 'validator'
import {
  ApiMessage,
  AuthApi,
  AuthApiConfig,
  LoginModel,
  RegistrationModel
} from '../../api/Methods/AuthApi'

const initialState: UserInfoModel = {
  isAuth: false,
  userData: {
    email: '',
    storageSpace: 0,
    usingPercent: 0,
    usingStorage: 0,
    id: ''
  }
}

const userReducerSlice = createSlice( {
  name: 'userReducer',
  initialState,
  reducers: {
    saveEmail( state: UserInfoModel, data: PayloadAction<string> ) {
      state.userData.email = data.payload
    },
    saveUser( state: UserInfoModel, data: PayloadAction<UserDataModel> ) {
      state.isAuth = true
      state.userData = data.payload
    },
    logout( state: UserInfoModel ) {
      state = initialState
    }
  }
} )

export const UserInfoMethods = {
  registration: createAsyncThunk<any, RegistrationModel, any>( '/saveUser', async ( data, thunkAPI ) => {
    const email = validator.isEmail( data.email )
    const password = validator.isLength( data.password, { min: 8, max: 32 } )
    const confirmPassword = validator.isLength( data.confirmPassword, { min: 8, max: 32 } )
    const passwordEquality = password === confirmPassword

    if( email && password && confirmPassword && passwordEquality ) {
      const response = await AuthApi.registration( data )
      const dispatch = thunkAPI.dispatch
      if( response.status === 200 ) {
        dispatch( userInfoReducers.saveEmail( data.email ) )
      } else {
        return thunkAPI.rejectWithValue( response.data.message )
      }

      return thunkAPI.fulfillWithValue( 'Регистрация пользователя успешно завершена!' )
    } else {
      if( !email ) {
        return thunkAPI.rejectWithValue( 'Указанный при регистрации Email-адрес невалидный.' )
      }

      if( !passwordEquality ) {
        return thunkAPI.rejectWithValue( 'Указанные "Пароль" и "Подтверждающий пароль" не совпадают.' )
      }

      if( !password || !confirmPassword ) {
        const { minLength, maxLength } = AuthApiConfig.password
        const messageKeyWord = !password ? 'Пароль' : 'Подтверждающий пароль'
        return thunkAPI.rejectWithValue( `Указанный ${messageKeyWord.toLowerCase()} не подходит. ${messageKeyWord} должен быть не короче ${minLength} и не длиннее ${maxLength} символов!` )
      }

      return thunkAPI.rejectWithValue( 'not valid' )
    }
  } ),
  login: createAsyncThunk<any, LoginModel, any>( '/loginUser', async ( data, thunkAPI ) => {
    const { email, password } = data
    const emailValidate = validator.isEmail( email )
    const passwordValidate = validator.isLength( password, {
      min: AuthApiConfig.password.minLength,
      max: AuthApiConfig.password.maxLength
    } )

    if( emailValidate && passwordValidate ) {
      const response = await AuthApi.login( data )
      const dispatch = thunkAPI.dispatch
      if( response.status === 200 && 'token' in response.data ) {
        const data: UserDataModel = response.data
        dispatch( userInfoReducers.saveUser( data ) )
      } else {

        response.data = response.data as unknown as ApiMessage
        return thunkAPI.rejectWithValue( response.data.message )
      }


    } else {
      if( !emailValidate ) {
        return thunkAPI.rejectWithValue( 'Указан невалидный Email-адрес' )
      }

      if( !passwordValidate ) {
        const { minLength, maxLength } = AuthApiConfig.password
        const messageKeyWord = !password ? 'Пароль' : 'Подтверждающий пароль'
        return thunkAPI.rejectWithValue( `Указанный ${messageKeyWord.toLowerCase()} не подходит. ${messageKeyWord} должен быть не короче ${minLength} и не длиннее ${maxLength} символов!` )
      }

      return thunkAPI.rejectWithValue( 'Емейл или пароль - невалидные' )
    }
  } )
}

export const userInfoReducers = userReducerSlice.actions
export const userInfo = userReducerSlice.reducer