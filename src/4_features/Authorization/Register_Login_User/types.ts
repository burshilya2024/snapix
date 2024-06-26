export interface IResponseRegisterApi {
  accessToken: string
  message?: string
}

export type RegistrationData = {
  email: string
  password: string
  username: string
}
export type RegistrationResponse = {
  message: string
}

export interface IRequestRegisterApi {
  email: string
  password: string
  username: string
}

export interface IRequestRefreshApi {
  access_token?: string
  body: {
    refresh_token?: string
  }
}
export interface IUser {
  email: string
  id: number
  token: string
}

export interface IUserData {
  email: string
  password: string
}

export interface IResponseUser {
  createdAt: string
  email: string
  id: number
  password: string
  updatedAt: string
}

export interface IResponseUserData {
  token: string
  user: IResponseUser
}
