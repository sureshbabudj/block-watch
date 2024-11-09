import { getSession, lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prismaClient";
import { User as BasicUser, Neighborhood } from "@prisma/client";
import { NextResponse } from "next/server";

type User = BasicUser & { neighborhoods: Neighborhood[] };

export async function getUser(
  req: Request
): Promise<{ error?: { message: string; status: number }; user?: User }> {
  const sessionId =
    (req as any).cookies.get(lucia.sessionCookieName)?.value ?? null;
  const { user } = await getSession(sessionId);

  if (!user || !user.id) {
    return { error: { message: "Unauthorized", status: 401 } };
  }

  // Fetch user data based on session
  const loggedInUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { neighborhoods: true },
  });

  if (!loggedInUser) {
    return { error: { message: "User not found", status: 401 } };
  }

  return { user: loggedInUser };
}

// Create a new post
export async function createPost(req: Request) {
  try {
    const { user, error } = await getUser(req);

    if (!user) {
      const { message = "Internal Server Error", status = 500 } = error ?? {};
      return NextResponse.json({ error: message }, { status });
    }

    if (user.neighborhoods.length === 0) {
      return NextResponse.json(
        { error: "You need to join a neigbrhood to post" },
        { status: 400 }
      );
    }

    const { content, neighborhoodId } = await req.json();

    if (neighborhoodId) {
      const isPartofNeighborhood = user.neighborhoods.find(
        (n) => n.id === neighborhoodId
      );
      if (!isPartofNeighborhood) {
        return NextResponse.json(
          { error: `You need to join a neigbrhood ${neighborhoodId} to post` },
          { status: 400 }
        );
      }
    }

    const post = await prisma.post.create({
      data: {
        content,
        authorId: user.id,
        neighborhoodId: neighborhoodId || user.neighborhoods[0].id,
      },
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Get all posts
export async function getPosts(req: Request) {
  try {
    const { user, error } = await getUser(req);

    if (!user) {
      const { message = "Internal Server Error", status = 500 } = error ?? {};
      return NextResponse.json({ error: message }, { status });
    }

    const posts = await prisma.post.findMany({
      include: {
        author: true,
        neighborhood: true,
        comments: true,
      },
    });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Get a single post by ID
export async function getPostById(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user, error } = await getUser(req);

    if (!user) {
      const { message = "Internal Server Error", status = 500 } = error ?? {};
      return NextResponse.json({ error: message }, { status });
    }

    const id = (await params).id;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        neighborhood: true,
        comments: true,
      },
    });
    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Delete a single post by ID
export async function deletePostById(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user, error } = await getUser(req);

    if (!user) {
      const { message = "Internal Server Error", status = 500 } = error ?? {};
      return NextResponse.json({ error: message }, { status });
    }

    const id = (await params).id;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "No post found!" }, { status: 404 });
    }

    if (post.authorId !== user.id) {
      return NextResponse.json(
        { error: "you do not have authorization to delete this post" },
        { status: 401 }
      );
    }

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "The post has been deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Update a single post by ID
export async function updatePostById(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { user, error } = await getUser(req);

    if (!user) {
      const { message = "Internal Server Error", status = 500 } = error ?? {};
      return NextResponse.json({ error: message }, { status });
    }

    const id = (await params).id;

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "No post found!" }, { status: 404 });
    }

    if (post.authorId !== user.id) {
      return NextResponse.json(
        { error: "you do not have authorization to update this post" },
        { status: 401 }
      );
    }

    const { content } = await req.json();

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        content,
      },
      include: {
        author: true,
        neighborhood: true,
        comments: true,
      },
    });
    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
