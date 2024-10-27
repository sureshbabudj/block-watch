import { createUser } from "@/lib/lucia";

export async function POST(request: Request) {
  return createUser(request);
}
