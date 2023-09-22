import jwt from "jsonwebtoken";

export class JwtUtils {
  static generateToken(data: any, expiresIn: string): string {
    return jwt.sign(data, process.env.TOKEN_SECRET!, { expiresIn });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET!);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
}
