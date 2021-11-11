import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInfoMethods } from '../UserReducer'
import {default as UUID} from 'node-uuid'

interface NotificationReducerModel {
  notificationList: Array<NotificationItemModel>
}

interface NotificationItemModel {
  id: string
  message: string,
  delay?: number,
  duration?: number,
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
}

const initialState = {
  notificationList: []
}

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state: NotificationReducerModel, data: PayloadAction<NotificationItemModel>){
      const list: NotificationReducerModel['notificationList'] = state.notificationList
      list.unshift(data.payload)

      state.notificationList = list
    }
  },
  extraReducers(builder){
    builder.addCase<any>(UserInfoMethods.registration.rejected, (state: NotificationReducerModel, data) => {
      state = addNotificationFromExtraReducer(state, data.payload)
    })
    builder.addCase<any>(UserInfoMethods.registration.fulfilled, (state: NotificationReducerModel, data) => {
      state = addNotificationFromExtraReducer(state, data.payload)
    })
    builder.addCase<any>(UserInfoMethods.login.rejected, (state: NotificationReducerModel, data) => {
      state = addNotificationFromExtraReducer(state, data.payload)
    })
    builder.addCase<any>(UserInfoMethods.login.fulfilled, (state: NotificationReducerModel, data) => {
      state = addNotificationFromExtraReducer(state, data.payload)
    })
  }
})

const addNotificationFromExtraReducer = (state: NotificationReducerModel, message: string): NotificationReducerModel => {
  const list: NotificationReducerModel['notificationList'] = state.notificationList
  list.unshift({
    id: UUID.v4(),
    message,
    delay: 0,
    duration: 10,
    position: 'top-center'
  })

  state.notificationList = list
  return state
}


export const NotificationStorage = notificationReducer.reducer