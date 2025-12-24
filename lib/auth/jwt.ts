import jwt from 'jsonwebtoken';

// In production, this secret should be in your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-development-key';

export class JWTManager {
  /**
   * Creates a token that proves who the user is.
   * Expires in 1 day.
   */
  public static sign(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  }

  /**
   * Checks if a token is valid.
   * Returns the user data if valid, or null if fake/expired.
   */
  public static verify(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}