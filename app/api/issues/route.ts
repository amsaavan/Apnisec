import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/db"; // Direct access to DB
import { verify } from "jsonwebtoken"; // We'll use raw JWT for now to be safe

// Helper to get user from token
async function getUserFromRequest(req: NextRequest) {
  const tokenCookie = req.cookies.get("token");
  if (!tokenCookie) return null;
  
  try {
    // Replace 'fallback-secret-key' with your process.env.JWT_SECRET if you used one
    const decoded = verify(tokenCookie.value, process.env.JWT_SECRET || 'fallback-secret-key') as any;
    return decoded;
  } catch (e) {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Check Auth
    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get Data
    const body = await req.json();
    const { title, description, type, priority } = body;

    // 3. Create Issue directly in Prisma
    const newIssue = await prisma.issue.create({
      data: {
        title,
        description,
        type,
        priority,
        status: 'Open',
        userId: user.id
      }
    });

    return NextResponse.json(newIssue);

  } catch (error) {
    console.error("Create Issue Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const issues = await prisma.issue.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(issues);
  } catch (error) {
    console.error("Get Issues Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}