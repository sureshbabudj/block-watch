import { getSession, lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const sessionId =
      (req as any).cookies.get(lucia.sessionCookieName)?.value ?? null;
    const { user } = await getSession(sessionId);

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user data based on session
    const loggedInUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!loggedInUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json(
      { user: { ...loggedInUser, password: undefined } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export const dynamic = "force-static";
