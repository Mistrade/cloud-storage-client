export interface UserInfoModel {
  isAuth: boolean
  error: UserErrorAuthModel | null
  userData: UserDataModel
}

export interface UserErrorAuthModel {
  type: null | 'confirm-password' | 'repeat-confirm-password',
  userId: string | null,
  message: string | null,
}

export interface UserDataModel {
  avatar: string | null
  id: string,
  email: string,
  name: string,
  surname: string,
  storageSpace: number,
  usingSpace: number,
  usingPercent: number,
}