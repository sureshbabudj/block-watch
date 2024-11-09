import {
  deleteCommentById,
  getCommentById,
  updateCommentById,
} from "../actions";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return getCommentById(req, { params });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return deleteCommentById(req, { params });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return updateCommentById(req, { params });
}

export const dynamic = "force-static";
