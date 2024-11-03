"use client";

import { userAtom } from "@/lib/appStore";
import { useAtom } from "jotai";
import {
  CalendarDays,
  CircleUserRound,
  HomeIcon,
  MessageSquareWarning,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Dot() {
  return (
    <div className="absolute h-8 w-8 top-0 right-0">
      <svg
        className="absolute text-orange-500 border-white"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        stroke="#fff"
        strokeWidth="3"
      >
        <circle cx="85" cy="15" r="15" />
      </svg>
    </div>
  );
}

export function NavBar() {
  const pathName = usePathname();
  const user = useAtom(userAtom);
  return (
    <div className="fixed bottom-0 left-0 bg-white rounded-t-2xl w-full h-16 sm:hidden">
      <ul className="flex justify-around items-center h-full">
        <li
          className={
            pathName === "/community"
              ? " text-orange-500"
              : "text-gray-400 relative"
          }
        >
          <Link href={user ? "/community" : "/"}>
            <HomeIcon />
          </Link>
        </li>
        <li
          className={
            pathName.startsWith("/main")
              ? "relative text-orange-500"
              : "text-gray-400 relative"
          }
        >
          <Link href="/community">
            <Dot />
            <MessageSquareWarning />
          </Link>
        </li>
        <li
          className={
            pathName.startsWith("/signin")
              ? "relative text-orange-500"
              : "text-gray-400 relative"
          }
        >
          <Link href="/community">
            <CalendarDays />
          </Link>
        </li>
        <li
          className={
            pathName.startsWith("/community/profile")
              ? "relative text-orange-500"
              : "text-gray-400 relative"
          }
        >
          <Link href="/community/profile">
            <CircleUserRound />
          </Link>
        </li>
      </ul>
    </div>
  );
}
