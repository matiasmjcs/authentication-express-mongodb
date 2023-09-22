export interface IUserLogin {
    email: string
    password: string
  }
export interface IUserSignUp extends IUserLogin {
  username: string
}