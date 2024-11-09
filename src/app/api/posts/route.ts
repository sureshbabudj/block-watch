import { createPost, getPosts } from "./actions";

export async function POST(req: Request) {
  return createPost(req);
}

export async function GET(req: Request) {
  return getPosts(req);
}

export const dynamic = "force-static";
