import { prisma } from '../../db'; // Adjust path if needed (e.g. '@/lib/db')
import { User } from '@prisma/client';

export class UserRepository {
  // Find a user by their email address
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  // Create a new user
  async create(data: any): Promise<User> {
    return await prisma.user.create({ data });
  }
  
  // Find a user by their ID
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id }});
  }
}