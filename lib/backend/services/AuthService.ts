import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository'; 
import { EmailService } from './EmailService';
import { JWTManager } from '@/lib/auth/jwt'; // Uses your JWT Manager class

export class AuthService {
  private userRepo: UserRepository;
  private emailService: EmailService;

  constructor() {
    // We instantiate them here so the Controller doesn't have to worry about it
    this.userRepo = new UserRepository();
    this.emailService = new EmailService();
  }

  async register(data: any) {
    // 1. Check if user already exists
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) throw new Error("User already exists");

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Create the user
    const user = await this.userRepo.create({ 
      name: data.name, 
      email: data.email, 
      password: hashedPassword 
    });
    
    // 4. Send Welcome Email (Fire and forget - don't await)
    this.emailService.sendWelcomeEmail(user.email, user.name || 'User');
    
    return user;
  }

  async login(data: any) {
    // 1. Find user
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) throw new Error("Invalid credentials");

    // 2. Compare passwords
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    // 3. Generate JWT Token using your Manager
    const token = JWTManager.sign({ id: user.id, email: user.email });
    
    return { user, token };
  }
}