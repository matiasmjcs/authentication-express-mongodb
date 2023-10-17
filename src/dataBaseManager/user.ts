import { IUserLogin, IUserSignUp } from "../interfaces/user/user.interface";
import User from "../models/user.models";
import { Document } from "mongoose";
import { config } from 'dotenv'; 
import { JwtUtils } from "../utils/jwt.utils";
import { PasswordUtils } from "../utils/password.utils";
config();


async function signUpUser(data: IUserSignUp): Promise<{ success: boolean; savedUser?: Document; error?: string }> {
  const { username, email, password } = data
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    const hashedPassword = await PasswordUtils.hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser: Document = await newUser.save();
    return { success: true, savedUser };
  } catch (error) {
    return {
      success: false,
      error: "DatabaseManager: signUpUser Internal server error" + error,
    };
  }
}


async function loginUser(data: IUserLogin): Promise<{ success: boolean; token?: string; error?: string }> {
  const { email, password } = data;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const validPassword = await PasswordUtils.comparePasswords(password, user.password!);

    if (!validPassword) {
      return { success: false, error: "Contraseña inválida" };
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = JwtUtils.generateToken(tokenData, "1h");

    return { success: true, token};
  } catch (error) {
    return {
      success: false,
      error: "DatabaseManager: Error interno al iniciar sesión " + error,
    };
  }
} 


async function deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await User.findById(id);
    if(!user) {
      return { success: false, error: "Usuario no encontrado" };
    }
    const deletedUser = await User.findByIdAndDelete(user._id);

    if (!deletedUser) {
      return { success: false, error: "Usuario no encontrado" };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Error interno al eliminar el usuario: " + error,
    };
  }
}


export { signUpUser, loginUser, deleteUser };
