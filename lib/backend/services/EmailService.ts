import { Resend } from 'resend';

export class EmailService {
  private resend: Resend;
  private fromEmail: string;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
    // Use 'onboarding@resend.dev' for testing if you don't have a custom domain
    this.fromEmail = 'onboarding@resend.dev'; 
  }

  async sendWelcomeEmail(email: string, name: string) {
    if (!process.env.RESEND_API_KEY) {
      console.log("⚠️ No Resend API Key found. Skipping email.");
      return;
    }

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Welcome to ApniSec!',
        html: `
          <h1>Welcome, ${name}!</h1>
          <p>Thank you for registering with ApniSec. Your account is now active.</p>
          <p>Go to your <a href="http://localhost:3000/dashboard">Dashboard</a> to start reporting issues.</p>
        `,
      });
      console.log(`📧 Welcome email sent to ${email}`);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }

  async sendIssueCreatedEmail(email: string, issueTitle: string) {
    if (!process.env.RESEND_API_KEY) return;

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'New Issue Created',
        html: `
          <h2>Issue Reported Successfully</h2>
          <p>You have successfully reported: <strong>${issueTitle}</strong></p>
          <p>Our team will review it shortly.</p>
        `,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }
}