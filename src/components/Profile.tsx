"use client";

import { userAtom } from "@/lib/appStore";
import { useAtom } from "jotai";

export function Profile() {
  const [user] = useAtom(userAtom);
  const displayUser = user && user.id ? user.firstName : "Guest";
  return <p>Welcome {displayUser}</p>;
}
