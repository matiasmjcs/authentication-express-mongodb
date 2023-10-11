import bcryptjs from "bcryptjs";
import { IPasswordUtils } from "../interfaces/utils/passwordUtils.interface";

export class PasswordUtils implements IPasswordUtils{
  async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  }

  async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcryptjs.compare(inputPassword, hashedPassword);
  }
}
