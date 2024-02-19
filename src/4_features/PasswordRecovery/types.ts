export interface IForgotPasswordForm {
  email: string
}

export interface IResetPasswordForm {
  confirmedPassword: string
  password: string
}

export type IResetPasswordRequest = Pick<IResetPasswordForm, 'password'> & {
  token: string
}

export type IVerifyTokenRequest = Pick<IResetPasswordRequest, 'token'>

//================ERROR TYPES============================================================

export interface Email {
  message: string
  property: string
}

export interface Token {
  message: number | string
  property: string
}

export interface Error {
  email?: Email
  token?: Token
}

export interface Data {
  errors: Error
  message: string
  path: string
  timestamp: string
}

export interface IErrorResponse {
  data: Data
  status: number
}
