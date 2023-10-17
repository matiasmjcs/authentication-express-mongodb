import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IUserControllers } from "../interfaces/user/userControllers.interface";
import { deleteUser, loginUser, signUpUser } from "../dataBaseManager/user";

export class UserControllers implements IUserControllers {

  async signUp(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const requestBody = req.body;
      const { username, password, email } = requestBody;
      const data = {
        username,
        email,
        password,
      };
      const result = await signUpUser(data);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.status(201).json({
        message: "User created successfully",
        success: true,
        user: result.savedUser,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "UserService: signUp Internal server error" + error });
    }
  }
 
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Correo electrónico y contraseña son obligatorios" });
      }
      const data = { email, password };
      const userAuthenticated = await loginUser(data);
      if (!userAuthenticated.success) {
        return res.status(401).json({ error: userAuthenticated.error });
      }

      res.cookie("token", userAuthenticated.token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      return res
        .status(200)
        .json({ message: "Login successful", success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "UserService: login Internal server error" + error });
    }
  }

  async logout(req: Request,res: Response): Promise<Response> {
    try {
      res.clearCookie("token");
      return res
        .status(204)
        .json({ message: "Logout successful", success: true });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "UserService: logout Internal server error" + error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      
      const result = await deleteUser(userId);
  
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
  
      return res.status(200).json({
        message: "User deleted successfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        error: "UserService: delete Internal server error" + error,
      });
    }
  }
}


