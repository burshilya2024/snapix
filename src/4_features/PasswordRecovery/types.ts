export interface IForgotPasswordForm {
  email: string
}

export interface IResetPasswordForm {
  newPassword: string
  confirmedPassword: string
}

export interface IResetPasswordRequest {
  password: string
  token: string
}

//================ERROR TYPES============================================================

export interface Email {
	message: string;
	property: string;
}

export interface Error {
	email: Email;
}

export interface Data {
	message: string;
	errors: Error;
	timestamp: string;
	path: string;
}

export interface IForgotPasswordErrorResponse {
	status: number;
	data: Data;
}


export interface Token {
	message: string;
	property: string;
}

export interface Error {
	token: Token;
}

export interface Data {
	message: string;
	errors: Error;
	timestamp: string;
	path: string;
}

export interface IResetPasswordErrorResponse {
	status: number;
	data: Data;
}