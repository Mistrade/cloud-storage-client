export interface UserInfoModel {
  isAuth: boolean
  userData: UserDataModel
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