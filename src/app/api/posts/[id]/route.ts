import { deletePostById, getPostById, updatePostById } from "../actions";

export async function generateStaticParams(arg) {
  debugger;
  return [];
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return getPostById(req, { params });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return deletePostById(req, { params });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return updatePostById(req, { params });
}

export const dynamic = "force-static";
