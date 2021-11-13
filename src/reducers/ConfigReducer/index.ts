import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConfigReducerModel, LoaderModel } from './types'

export const initialLoaderState = {
  isActive: false,
  message: ''
}

const initialState: ConfigReducerModel = {
  loader: initialLoaderState
}

const ConfigReducer = createSlice({
  name: 'configStorage',
  initialState,
  reducers: {
    setLoader(state, data: PayloadAction<LoaderModel>){
      console.log(data.payload)
      state.loader = data.payload
    }
  }
})

export const configStorage = ConfigReducer.reducer
export const configActions = ConfigReducer.actions