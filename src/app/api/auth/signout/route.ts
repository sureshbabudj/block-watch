import { logoutUser } from "@/lib/lucia";

export async function POST(request: Request) {
  return logoutUser(request);
}
