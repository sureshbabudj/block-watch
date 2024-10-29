"use client";

import { userAtom } from "@/lib/appStore";
import { useAtom } from "jotai";
import { SignoutAction } from "./SignoutAction";

export function Profile() {
  const [user] = useAtom(userAtom);
  const displayUser = user && user.id ? user.firstName : "Guest";
  return <p>Welcome {displayUser}!  {user && user.id && <SignoutAction />}</p>;
}
