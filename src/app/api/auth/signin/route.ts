import { loginUser } from "@/lib/lucia";

export async function POST(request: Request) {
  return loginUser(request);
}
