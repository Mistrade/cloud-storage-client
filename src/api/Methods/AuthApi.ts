import { apiURLS } from '../Info/ApiURLS'
import { Api, ApiResponse } from '../index'
import { UserDataModel, UserInfoModel } from '../../reducers/UserReducer/types'

export interface RegistrationModel {
  email: string,
  password: string,
  confirmPassword: string
}

export type LoginModel = Omit<RegistrationModel, 'confirmPassword'>

export interface ApiMessage {
  message: string
}

interface LoginSuccessModel {
  token: string,
  userData: UserInfoModel
}

interface AuthApiModel {
  registration: (data: RegistrationModel) => ApiResponse<ApiMessage>,
  login: (data: LoginModel) => ApiResponse<UserDataModel | ApiMessage>
}

export const AuthApiConfig = {
  password: {
    minLength: 8,
    maxLength: 32
  }
}

export const AuthApi: AuthApiModel = {
  //Асинхронный Api-метод для регистрации нового пользователя
  async registration(data){
    //Принимает объект вида RegistrationModel и возвращает объект вида RegistrationSuccessModel, в случае успеха
    return await Api.post<RegistrationModel, ApiMessage>(apiURLS.registration, data)
  },

  //Асинхронный Api-метод для авторизации существующего пользователя
  async login(data){

    //Принимает объект вида LoginModel и возвращает объект вида LoginSuccessModel
    return await Api.post<LoginModel, UserDataModel>(apiURLS.login, data)
  }
}