import { getSession, lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prismaClient";
import { promises as fs } from "fs";
import { writeFile } from "fs/promises";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

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

const runMiddleware = (file: any) => {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure the uploads directory exists
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // With the file data in the buffer, you can do whatever you want with it.
      // For this example, we'll save it to the public directory
      const filePath = join(process.cwd(), "public", "uploads", file.name);
      await writeFile(filePath, buffer);

      return resolve(`/uploads/${file.name}`);
    } catch (error: any) {
      return reject(error.message ?? "File upload error");
    }
  });
};

export async function PATCH(req: NextRequest) {
  try {
    const sessionId =
      (req as any).cookies.get(lucia.sessionCookieName)?.value ?? null;
    const { user } = await getSession(sessionId);

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await req.formData();
    const {
      address = user.address,
      bio = user.bio,
      dateOfBirth = user.dateOfBirth,
      email = user.email,
      lastName = user.lastName,
      firstName = user.firstName,
      profilePicture,
      gender = user.gender,
    } = Object.fromEntries(formData) as Partial<User>;

    let profilePictureFilePath: any = user.profilePicture;
    if (!profilePicture || profilePicture !== `undefined`) {
      profilePictureFilePath = await runMiddleware(profilePicture);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        address,
        bio,
        dateOfBirth,
        email,
        lastName,
        firstName,
        profilePicture: profilePictureFilePath,
        gender,
      },
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
