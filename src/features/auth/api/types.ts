export interface IResponseRegisterApi {
  access_token?: string
  email: string
  refresh_token?: string
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
