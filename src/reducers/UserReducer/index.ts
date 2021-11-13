import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDataModel, UserInfoModel } from './types'

const initialState: UserInfoModel = {
  isAuth: false,
  userData: {
    avatar: null,
    email: '',
    name: '',
    surname: '',
    storageSpace: 0,
    usingPercent: 0,
    usingSpace: 0,
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
    logout( state: UserInfoModel, data: PayloadAction) {
      state.isAuth = false
      state.userData = initialState.userData
    }
  }
} )

export const userInfoActions = userReducerSlice.actions
export const userInfo = userReducerSlice.reducer