import axios from 'axios'
import { UserModel } from '../models/UserModel'
const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/user/me`
export const LOGIN_URL = `${API_URL}/authentication/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/user/forgetPasswordRequest`
export const FORGET_PASSWORD_VERRIFY = `${API_URL}/user/verifyResetToken`
export const RESET_PASSWORD = `${API_URL}/user/resetPasswordByToken`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post(LOGIN_URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string,
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  })
}
// verrify token for forget password
export function forgetPassworVerrify(token: string) {
  return axios.post<{ result: any }>(FORGET_PASSWORD_VERRIFY, {
    resetToken: token,
  })
}
// reset password
export function resetPassword(
  new_password: string,
  confirm_password: string,
  resetToken: string,
) {
  return axios.post<{ result: any }>(RESET_PASSWORD, {
    new_password: new_password,
    confirm_password: confirm_password,
    resetToken: resetToken,
  })
}

export function getUserByToken(token: string) {
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    headers: { 'x-access-token': token },
  })
}
