import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDataModel, UserErrorAuthModel, UserInfoModel } from './types'
import { ApiMessage } from '../../api/Methods/AuthApi'
import { LsHandler, LSKeys } from '../../common/lsHandler'

const initialState: UserInfoModel = {
  isAuth: false,
  error: LsHandler.getItem<UserErrorAuthModel>( 'AuthErrorObject' ) || null,
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
    logout( state: UserInfoModel, data: PayloadAction ) {
      state.isAuth = false
      state.userData = initialState.userData
    },
    setConfirmPasswordInfo( state: UserInfoModel, data: PayloadAction<ApiMessage | null> ) {
      state.error = data.payload ? {
        type: data.payload?.type || null,
        message: data.payload?.message || null,
        userId: data.payload?.userId || null
      } : null
    },
    findErrorFromLocalStorage( state: UserInfoModel, data: PayloadAction ) {
      const item = LsHandler.getItem( 'AuthErrorObject' )

      if( !item ) {
        state.error = null
        return
      }

      state.error = item
    }
  }
} )

export const userInfoActions = userReducerSlice.actions
export const userInfo = userReducerSlice.reducer