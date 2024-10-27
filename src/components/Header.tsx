import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex justify-between px-2 py-4 fixed top-0 left-0 w-full bg-white border-b border-cyan-600 z-1 items-center">
      <ChevronLeft />
      <h3 className="text-amber-700 font-extrabold text-lg">Block Watch</h3>
      <div className="relative">
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
        <Image
          className="h-8 w-8 rounded-full"
          width="80"
          height="80"
          src="https://images.unsplash.com/photo-1554555819-f722cb0c01c5?ixlib=rb-	1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=80&h=80"
          alt="Profil woman"
        />
      </div>
    </header>
  );
}
