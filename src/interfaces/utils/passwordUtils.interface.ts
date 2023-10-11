export interface IPasswordUtils {
  hashPassword(password: string): Promise<string>;
  comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean>;
}