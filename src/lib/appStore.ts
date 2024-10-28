import { atom } from "jotai";
import { User } from "@prisma/client";

export type LoggedInUser = Omit<User, "password">;
export const userAtom = atom<LoggedInUser | null>(null);
