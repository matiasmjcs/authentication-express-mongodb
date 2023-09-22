import bcryptjs from "bcryptjs";

export class PasswordUtils {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
  }

  static async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcryptjs.compare(inputPassword, hashedPassword);
  }
}
