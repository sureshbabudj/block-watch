import { prisma } from "./prismaClient";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, TimeSpan, Session } from "lucia";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { User } from "@prisma/client";

export const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"), // 2 weeks
});

// Helper function to send error response
const sendErrorResponse = (message?: string, status = 400) => {
  return NextResponse.json(
    { error: message ?? "Internal Server Error" },
    { status },
  );
};

// Helper function to send success response
const sendSuccessResponse = (data: Partial<User> | { success: true }) => {
  return NextResponse.json(data, { status: 200 });
};

// User creation handler
export const createUser = async (req: Request) => {
  try {
    const { email, password, firstName, lastName, address } = await req.json();

    // 1. Verify the payload
    if (!email || !password || !firstName || !lastName || !address) {
      return sendErrorResponse(
        "Email, password, name and address are required.",
      );
    }

    // 1.b Check if email is duplicated
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return sendErrorResponse("Email is already in use.");
    }

    // 2.a Create a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2.b Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        address,
      },
    });

    // Send success response with non-sensitive information
    return sendSuccessResponse({ id: user.id, email: user.email });
  } catch (error: any) {
    return sendErrorResponse(error?.message, 500);
  }
};

// User login handler
export const loginUser = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    // 3.a Verify the payload
    if (!email || !password) {
      return sendErrorResponse("Email and password are required.");
    }

    // 3.b Check if email exists in the database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return sendErrorResponse("Email not found.");
    }

    // 3.c Compare input password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendErrorResponse("Invalid password.");
    }

    // 3.d Create a session with Lucia
    const session = await lucia.createSession(user.id, {
      userId: user.id,
    });

    // 3.e Set cookies
    const { name, value } = lucia.createSessionCookie(session.id);
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set(name, value);
    return response;
  } catch (error: any) {
    return sendErrorResponse(error?.message, 500);
  }
};

// User logout handler
export const logoutUser = async (req: Request) => {
  const sessionId = req.headers.get(lucia.sessionCookieName) ?? null;
  const { user } = await getSession(sessionId);
  if (!user || !user.id) {
    return sendErrorResponse("user not logged in!");
  } else {
    lucia.invalidateUserSessions(user.id);
    return NextResponse.json({ message: "Logout successful" });
  }
};

export const getSession = async (
  sessionId?: string | null,
): Promise<{ user: Partial<User> | null; session: Session | null }> => {
  const empty = {
    user: null,
    session: null,
  };
  if (!sessionId) {
    return empty;
  }
  return lucia.validateSession(sessionId);
};
