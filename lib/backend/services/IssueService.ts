import { IssueRepository } from '../repositories/IssueRepository';
import { UserRepository } from '../repositories/UserRepository'; // Needed to find user email
import { EmailService } from './EmailService'; // Needed to send email

export class IssueService {
  private issueRepo: IssueRepository;
  private userRepo: UserRepository;
  private emailService: EmailService;

  constructor() {
    this.issueRepo = new IssueRepository();
    this.userRepo = new UserRepository();
    this.emailService = new EmailService();
  }

  async createIssue(userId: string, data: any) {
    // 1. Business Logic: Validation
    if (!data.title || !data.description || !data.type) {
      throw new Error("Title, Description, and Type are required.");
    }

    // 2. Business Rule: Check for valid types
    const validTypes = ['Cloud Security', 'Reteam Assessment', 'VAPT'];
    if (!validTypes.includes(data.type)) {
      throw new Error("Invalid issue type.");
    }

    // 3. Create the issue in Database
    const issue = await this.issueRepo.create({ ...data, userId });

    // 4. Send Notification Email
    // We fetch the user first to get their email address
    try {
      const user = await this.userRepo.findById(userId);
      if (user && user.email) {
        // Fire and forget (don't await) so the UI doesn't freeze
        this.emailService.sendIssueCreatedEmail(user.email, issue.title);
      }
    } catch (err) {
      console.error("Failed to send notification email", err);
    }

    return issue;
  }

  async getUserIssues(userId: string) {
    return await this.issueRepo.findAllByUserId(userId);
  }
}