export interface UserInfoModel {
  isAuth: boolean
  userData: UserDataModel
}

export interface UserDataModel {
  id: string,
  email: string,
  name: string,
  surname: string,
  storageSpace: number,
  usingStorage: number,
  usingPercent: number,
}