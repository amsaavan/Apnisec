# Apnisec Platform

Apnisec is a modern, secure web platform built with **Next.js 16**, **TypeScript**, and **Prisma**. It features a robust authentication system using JWTs, HTTP-only cookies, and server-side validation, designed for high performance and security on the Edge.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Styling:** Tailwind CSS & Lucide React
- **Authentication:** Custom JWT (JSON Web Token) with `bcryptjs`
- **Deployment:** Vercel

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
git clone [https://github.com/amsaavan/Apnisec.git](https://github.com/amsaavan/Apnisec.git)
cd Apnisec.

### 2. Install Dependencies
npm install

### 3. Configure Environment Variables
# Database connection string (e.g., PostgreSQL, MySQL, MongoDB)
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/apnisec_db"

# Secret key for signing JWTs (use a long, random string)
JWT_SECRET="your_secure_random_secret_key"

# Environment Mode
NODE_ENV="development"

### 4. Database Setup
# Generate Prisma Client
npx prisma generate

# Push schema to database (for prototyping)
npx prisma db push

### 5. Run Development Server
npm run dev

Open http://localhost:3000 in your browser.








