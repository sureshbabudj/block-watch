import { createComment, getCommentsByPost } from "./actions";

export async function POST(req: Request) {
  return createComment(req);
}

export async function GET(req: Request) {
  return getCommentsByPost(req);
}

export const dynamic = "force-static";
