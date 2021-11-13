import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const FileReducer = createSlice({
  name: 'fileState',
  initialState,
  reducers: {

  },
  extraReducers: {

  }
})

export const filesActions = FileReducer.actions
export const filesStorage = FileReducer.reducer