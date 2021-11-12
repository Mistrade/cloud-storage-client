import { LabelComponentProps } from './Label/types'
import React from 'react'

export interface MainInputProps {
  labelConfig: LabelComponentProps,
  inputType?: HTMLInputElement['type'],
  onBlur?: (e: React.FocusEvent<HTMLInputElement>, value: string) => any,
  status: StatusType,
  errorMessage: string,
  onFocus?: (e: React.FocusEvent<HTMLInputElement>, value: string) => any,
  isRequired: boolean
}

export type StatusType = 'correct' | 'incorrect' | 'insipid'