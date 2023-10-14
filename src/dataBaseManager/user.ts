import { IUserLogin, IUserSignUp } from "../interfaces/user/user.interface";
import User from "../models/user.models";
import bcryptjs from "bcryptjs";
import { Document } from "mongoose";
import jwt from "jsonwebtoken";
import { config } from 'dotenv'; 
config();

/**
 * Signs up a user and returns a promise that resolves to an object with the following properties:
 *
 * @param {IUserSignUp} data - An object containing the necessary data for user sign up, including username, email, and password.
 * @return {Promise<{ success: boolean; savedUser?: Document; error?: string }>} - A promise that resolves to an object with the following properties:
 *   - success: A boolean indicating whether the sign up was successful or not.
 *   - savedUser: (optional) A Document representing the saved user in the database.
 *   - error: (optional) A string describing the error that occurred during sign up.
 */
async function signUpUser(data: IUserSignUp): Promise<{ success: boolean; savedUser?: Document; error?: string }> {
  const { username, email, password } = data
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

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

/**
 * Log in a user with the provided credentials and return a success
 * flag, an optional token, and an optional error message.
 *
 * @param {IUserLogin} data - The user login data containing the email
 * and password.
 * @return {Promise<{ success: boolean; token?: string; error?: string }>}
 * An object with a success flag indicating if the login was successful,
 * an optional token if the login was successful, and an optional error
 * message if the login was unsuccessful.
 */
async function loginUser(data: IUserLogin): Promise<{ success: boolean; token?: string; error?: string }> {
  const { email, password } = data;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, error: "Usuario no encontrado" };
    }

    const validPassword = await bcryptjs.compare(password, user.password!);

    if (!validPassword) {
      return { success: false, error: "Contraseña inválida" };
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    return { success: true, token };
  } catch (error) {
    return {
      success: false,
      error: "DatabaseManager: Error interno al iniciar sesión " + error,
    };
  }
} 


/**
 * Deletes a user by their ID.
 *
 * @param {string} id - The ID of the user to be deleted.
 * @return {Promise<{ success: boolean; error?: string }>} - A promise that resolves to an object with a success property indicating whether the user was deleted successfully, and an optional error property with the error message if any.
 */
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
