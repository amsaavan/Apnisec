import { AuthService } from '../services/AuthService';
import { NextResponse } from 'next/server';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request) {
    try {
      const body = await req.json();
      
      // Simple validation
      if (!body.email || !body.password || !body.name) {
        return NextResponse.json(
          { error: "Missing required fields" }, 
          { status: 400 }
        );
      }

      // FIX 1: Passed as object
      await this.authService.register({
        name: body.name,
        email: body.email,
        password: body.password
      });
      
      return NextResponse.json(
        { message: "User registered successfully" }, 
        { status: 201 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Registration failed" }, 
        { status: 400 }
      );
    }
  }

  async login(req: Request) {
    try {
      const body = await req.json();
      
      if (!body.email || !body.password) {
        return NextResponse.json(
          { error: "Email and password are required" }, 
          { status: 400 }
        );
      }

      // FIX 2: Wrapped arguments in a single object here as well
      const token = await this.authService.login({
        email: body.email, 
        password: body.password
      });
      
      // Create response with success message
      const response = NextResponse.json(
        { message: "Login successful" }, 
        { status: 200 }
      );
      
      // Set the JWT as an HTTP-Only cookie
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400, // 1 day in seconds
        path: '/',
      });
      
      return response;
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Login failed" }, 
        { status: 401 }
      );
    }
  }
}
