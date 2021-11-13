import React from 'react'
import { AuthType, FormInputNames, RegistrationFormModel } from '../AuthPage'

export interface RegistrationSectionProps {
  formTitle?: string | React.ReactNode
  blurHandler: ( input: FormInputNames, value: string ) => any,
  state: RegistrationFormModel,
  setState: React.Dispatch<React.SetStateAction<RegistrationFormModel>>
  changeModeHandler: (mode: AuthType) => void
}