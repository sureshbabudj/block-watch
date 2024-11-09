import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

// Create a new comment
export async function createComment(req: Request) {
  const { content, authorId, postId } = await req.json();
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId,
      },
    });
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Get all comments for a post
export async function getCommentsByPost(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    if (!postId) {
      throw new Error("Post Id needed");
    }
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: true,
      },
    });
    return NextResponse.json({ comments }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Delete a comment
export async function deleteCommentById(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    await prisma.comment.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "The comment has been deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Get a comment
export async function getCommentById(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        author: true,
        post: true,
      },
    });
    return NextResponse.json({ comment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Update a comment
export async function updateCommentById(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const { content } = await req.json();
  try {
    const comment = await prisma.comment.update({
      where: { id },
      data: {
        content,
      },
      include: {
        author: true,
        post: true,
      },
    });
    return NextResponse.json({ comment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
