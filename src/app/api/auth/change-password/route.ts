import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getSession, lucia } from "@/lib/lucia";

export async function POST(req: Request) {
  try {
    const sessionId =
      (req as any).cookies.get(lucia.sessionCookieName)?.value ?? null;
    const { user } = await getSession(sessionId);

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          error:
            "Email, Current and New Passwords are both needed to update the existing password!",
        },
        { status: 400 }
      );
    }

    const loggedInUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!loggedInUser) {
      return NextResponse.json(
        {
          error: `User not found for the given request bearing userID: ${user.id}`,
        },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      loggedInUser.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: `Invalid password`,
        },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: { id: loggedInUser.id },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || `Internal Server Error`,
      },
      { status: 401 }
    );
  }
}
