import {IUserLogin, IUserSignUp} from './user.interfaces'
import { Document } from "mongoose";
export interface IDatabaseManager {
    signUpUser(data: IUserSignUp): Promise<{ success: boolean; savedUser?: Document; error?: string }>;
    loginUser(data: IUserLogin): Promise<{ success: boolean; token?: string; error?: string }>
  }
  