import { prisma } from '../../db';
import { Issue } from '@prisma/client';

export class IssueRepository {
  // Create a new issue
  async create(data: any): Promise<Issue> {
    return await prisma.issue.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        priority: data.priority || 'Medium',
        status: 'Open',
        userId: data.userId, // Link to the user
      },
    });
  }

  // Find all issues for a specific user
  async findAllByUserId(userId: string): Promise<Issue[]> {
    return await prisma.issue.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Newest first
    });
  }
}