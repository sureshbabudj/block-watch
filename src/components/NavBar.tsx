"use client";

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
  return (
    <div className="fixed bottom-0 border-gray-100 border-2 left-0 bg-white shadow-xl rounded-full w-full h-16 mb-1">
      <ul className="flex justify-around items-center h-full">
        <li
          className={
            pathName === "/" ? " text-orange-500" : "text-gray-400 relative"
          }
        >
          <Link href="/">
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
          <Link href="/main">
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
          <Link href="/signin">
            <CalendarDays />
          </Link>
        </li>
        <li
          className={
            pathName.startsWith("/profile")
              ? "relative text-orange-500"
              : "text-gray-400 relative"
          }
        >
          <Link href="/profile">
            <CircleUserRound />
          </Link>
        </li>
      </ul>
    </div>
  );
}
