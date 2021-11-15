import { apiURLS } from '../Info/ApiURLS'
import { Api, ApiResponse } from '../index'
import { UserDataModel, UserInfoModel } from '../../reducers/UserReducer/types'
import { Simulate } from 'react-dom/test-utils'

export interface RegistrationModel {
  name: string,
  surname: string,
  email: string,
  password: string,
  confirmPassword: string
}

export type LoginModel = {
  email: string,
  password: string
}

export interface ApiMessage {
  message: string
  type?: 'confirm-password' | 'repeat-confirm-password',
  userId?: string
}

export interface LoginSuccessModel {
  userData: UserDataModel
}

interface AuthApiModel {
  registration: ( data: RegistrationModel ) => ApiResponse,
  login: ( data: LoginModel ) => ApiResponse<LoginSuccessModel>,
  checkSession: () => ApiResponse<LoginSuccessModel>,
  logout: () => ApiResponse,
  updateDevice: ( data: UpdateDeviceRequestModel ) => ApiResponse<LoginSuccessModel>
}

interface UpdateDeviceRequestModel {
  userId: string,
  password: string
}

export const AuthApiConfig = {
  password: {
    minLength: 8,
    maxLength: 32
  }
}

export const AuthApi: AuthApiModel = {
  //Асинхронный Api-метод для регистрации нового пользователя
  async registration( data ) {
    //Принимает объект вида RegistrationModel и возвращает объект вида RegistrationSuccessModel, в случае успеха
    return await Api.post<RegistrationModel, ApiMessage>( apiURLS.registration, data )
  },

  //Асинхронный Api-метод для авторизации существующего пользователя
  async login( data ) {

    //Принимает объект вида LoginModel и возвращает объект вида LoginSuccessModel
    return await Api.post<LoginModel, LoginSuccessModel>( apiURLS.login, data ).then( r => r ).catch( err => err )
  },
  async checkSession() {
    return await Api.post<any, any>( apiURLS.checkSession, {} )
  },
  async logout() {
    return await Api.post<any, ApiMessage>( apiURLS.logout, {} )
  },
  async updateDevice( data ) {
    return await Api.post<UpdateDeviceRequestModel, LoginSuccessModel | ApiMessage>( apiURLS.updateDevice, data )
  }
}