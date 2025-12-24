import { NextResponse, NextRequest } from 'next/server';
import { IssueService } from '../services/IssueService';
import { JWTManager } from '@/lib/auth/jwt'; 

export class IssueController {
  private issueService: IssueService;

  constructor() {
    this.issueService = new IssueService();
  }

  // Helper to get User ID from the secure cookie
  private getUserId(req: NextRequest): string | null {
    const token = req.cookies.get('token')?.value;
    if (!token) return null;

    const decoded = JWTManager.verify(token);
    return decoded ? (decoded as any).id : null;
  }

  // POST: Create a new issue
  async create(req: NextRequest) {
    try {
      const userId = this.getUserId(req);
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const body = await req.json();
      const issue = await this.issueService.createIssue(userId, body);
      
      return NextResponse.json(issue, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  // GET: List all issues for the logged-in user
  async getAll(req: NextRequest) {
    try {
      const userId = this.getUserId(req);
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const issues = await this.issueService.getUserIssues(userId);
      return NextResponse.json(issues, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}