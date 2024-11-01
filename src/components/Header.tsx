"use client";

import { Bell, ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { userAtom } from "@/lib/appStore";
import { useAtom } from "jotai";
export function Logo() {
  return (
    <svg
      fill="currentcolor"
      className="block"
      width="50px"
      height="50px"
      viewBox="0 0 256 234"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <path
        className="fill-orange-500"
        d="M 59.149 124.359 L 37.023 99.428 L 74.989 65.445 L 64.723 56.065 L 2.105 112.113 L 11.625 122.84 L 21.279 114.124 L 21.279 175.416 L 63.422 175.416 L 63.422 120.502 L 59.149 124.359 Z M 198.878 101.046 L 165.651 70.801 L 165.651 35.704 L 146.306 35.704 L 146.306 53.01 L 123.825 32.469 L 48.294 100.076 L 59.777 113.015 L 71.422 102.502 L 71.422 175.417 L 114.451 175.417 L 114.451 146.863 L 114.451 146.616 L 113.764 97.286 C 116.156 67.615 149.061 75.621 146.031 98.617 L 146.76 175.412 L 175.662 175.442 L 175.635 103.148 L 187.093 113.661 L 198.878 101.046 Z M 226.349 87.843 L 226.349 58.746 L 210.311 58.746 L 210.311 73.093 L 191.673 56.064 L 176.382 69.751 L 210.256 100.585 L 187.526 124.917 L 183.635 121.347 L 183.635 175.417 L 234.626 175.417 L 234.626 114.661 L 244.125 123.377 L 253.895 112.918 L 226.349 87.843 Z"
      ></path>
      <path
        className="fill-red-900"
        d="M 122.669 153.913 C 120.687 155.929 119.691 158.391 119.691 161.312 C 119.691 164.467 120.819 167.118 123.069 169.266 C 125.148 171.247 127.645 172.238 130.565 172.238 C 133.549 172.238 136.126 171.161 138.273 168.997 C 140.421 166.832 141.492 164.255 141.492 161.266 C 141.492 158.38 140.449 155.866 138.371 153.718 C 136.292 151.536 133.784 150.448 130.863 150.448 C 127.616 150.443 124.885 151.599 122.669 153.913 Z M 121.409 90.711 C 119.697 93.294 118.849 113.501 118.849 117.326 C 118.849 120.447 119.376 123.889 120.43 127.645 C 121.483 131.402 122.921 134.924 124.73 138.216 C 127.181 142.677 129.082 144.911 130.422 144.911 C 131.797 144.911 133.612 143.164 135.857 139.677 C 137.838 136.59 139.419 133.08 140.61 129.134 C 141.801 125.189 142.396 121.506 142.396 118.082 C 142.396 112.917 140.999 91.92 138.216 89.102 C 136.137 86.955 133.606 85.878 130.623 85.878 C 126.597 85.878 123.522 87.493 121.409 90.711 Z"
      ></path>
    </svg>
  );
}

export function Header() {
  const [user] = useAtom(userAtom);
  return (
    <div className="fixed sm:static top-0 left-0 w-full bg-white">
      <nav className="flex relative justify-between items-center mx-auto px-8 h-16 max-w-screen-xl">
        {/* <!-- logo --> */}
        <div className="inline-flex">
          <Link href="/" className="font-semibold text-lg">
            <div className="hidden md:flex flex-row items-center justify-center gap-2">
              <Logo />
              Block Watch
            </div>
            <div className="block md:hidden">
              <Logo />
            </div>
          </Link>
        </div>
        {/* <!-- end logo --> */}

        {/* <!-- search bar --> */}
        <div className="hidden sm:block justify-start px-2">
          <div className="relative">
            <Input
              type="email"
              placeholder="text"
              className="rounded-full px-4"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-8 w-8 m-1 rounded-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* <!-- end search bar --> */}

        {/* <!-- login --> */}
        <div className="flex-initial">
          <div className="flex justify-end items-center relative">
            <div className="flex mr-4 items-center">
              <div className="block sm:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="block relative">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="block">
              <Button variant="ghost" className="rounded-full w-10 h-10">
                <Avatar className="hover:border-2">
                  {user?.profilePicture ? (
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user.firstName}
                    />
                  ) : (
                    <AvatarFallback>G</AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
        {/* <!-- end login --> */}
      </nav>
    </div>
  );
}
