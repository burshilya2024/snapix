export interface IForgotPasswordForm {
  email: string
}

export interface IResetPasswordForm {
  password: string
  confirmedPassword: string
}

export type IResetPasswordRequest  = Pick<IResetPasswordForm, 'password'> & {
  token: string
}

export type IVerifyTokenRequest = Pick<IResetPasswordRequest, 'token'>

//================ERROR TYPES============================================================

export interface Email {
	message: string;
	property: string;
}

export interface Token {
	message: string | number;
	property: string;
}

export interface Error {
	email?: Email;
	token?: Token;
}

export interface Data {
	message: string;
	errors: Error;
	timestamp: string;
	path: string;
}

export interface IErrorResponse {
	status: number;
	data: Data;
}
