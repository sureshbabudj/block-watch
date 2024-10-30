import { getSession, lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prismaClient";
import { User } from "@prisma/client";
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
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const sessionId =
      (req as any).cookies.get(lucia.sessionCookieName)?.value ?? null;
    const { user } = await getSession(sessionId);

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { gender, dateOfBirth, profilePicture, bio } = await req.json();

    const data: Partial<User> = {};
    if (gender) data.gender = gender;
    if (dateOfBirth) data.dateOfBirth = new Date(dateOfBirth);
    // if (profilePicture) data.profilePicture = profilePicture;
    if (bio) data.bio = bio;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data,
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-static";
