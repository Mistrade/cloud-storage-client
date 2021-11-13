export interface ConfigReducerModel {
  loader: LoaderModel
}

export interface LoaderModel {
  isActive: boolean,
  message: string
}