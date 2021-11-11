import { Action, AnyAction, combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { userInfo } from './UserReducer/index'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { NotificationStorage } from './NotificationReducer'


const reducers = combineReducers({
  userInfo: userInfo,
  notification: NotificationStorage
})


const store = configureStore( {
  reducer: reducers
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
  > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AnyAction
  >

export default store