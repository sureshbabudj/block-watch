"use client";

import {
  Heart,
  MenuIcon,
  MessageCircle,
  Search,
  SearchIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { isMenuOpenAtom, userAtom } from "@/lib/appStore";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { SignoutAction } from "@/app/community/profile/SignoutAction";
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
  const [open, setMenuOpen] = useAtom(isMenuOpenAtom);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="flex bg-white border-b px-4 py-1 mb-[5px] tracking-wide max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:w-full max-sm:z-[999]">
      <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
        {/* <!-- logo --> */}
        <div className="inline-flex">
          <Link
            href={user ? "/community" : "/"}
            className="font-semibold text-lg"
          >
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
        {/* menu */}
        <div
          id="collapseMenu"
          className={cn(
            { "max-lg:hidden": !open },
            { "max-lg:block": open },
            "lg:ml-10 lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
          )}
        >
          <Button
            variant={"ghost"}
            size={"icon"}
            id="toggleClose"
            onClick={closeMenu}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
          >
            <X />
          </Button>
          <ul className="lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link
                href={user ? "/community" : "/"}
                className="text-[#007bff] hover:text-[#007bff] text-[15px] block font-semibold"
              >
                Home
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link
                href="/community"
                className="text-[#333] hover:text-[#007bff] text-[15px] block font-semibold"
              >
                Neighbourhood
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link
                href="/community/profile"
                className="text-[#333] hover:text-[#007bff] text-[15px] block font-semibold"
              >
                Profile
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link
                href="/"
                className="text-[#333] hover:text-[#007bff] text-[15px] block font-semibold"
              >
                Messages
              </Link>
            </li>
          </ul>
        </div>
        {/* end menu */}
        <div className="flex gap-x-6 gap-y-4 ml-auto">
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
          <div className="flex items-center space-x-4 sm:space-x-8">
            {/* search icon */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full pl-3 block sm:hidden"
            >
              <SearchIcon />
            </Button>
            {/* end search icon */}
            {/* Heart Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative max-[420px]:hidden"
            >
              <Heart />
              <span className="absolute right-1 -mr-1 top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                0
              </span>
            </Button>
            {/* End Heart Icon */}
            {/* Message Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
            >
              <MessageCircle />
              <span className="absolute right-1 -mr-1 top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                0
              </span>
            </Button>
            {/* End Message Icon */}
            {/* Avatar */}
            <>
              {!user ? (
                <button className="px-5 py-2 text-sm rounded-full text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]">
                  Sign In
                </button>
              ) : (
                <div className="block">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="rounded-full w-10 h-10"
                      >
                        <Avatar className="hover:border-2">
                          {user.profilePicture ? (
                            <AvatarImage
                              src={user.profilePicture}
                              alt={user.firstName}
                            />
                          ) : (
                            <AvatarFallback>
                              {user
                                ? `${user.firstName.split("")[0]}${user.lastName.split("")[0]}`
                                : "G"}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto m-1 p-0 ">
                      <ul className="bg-white px-4 py-3 space-y-4 rounded-lg">
                        <li className="border-b hover:bg-gray-50 px-4 py-2 rounded">
                          <Link href="/community/profile">Profile</Link>
                        </li>
                        <li className="last:border-b-0 hover:bg-gray-50 hover:text-red-600 px-4 py-2 rounded">
                          <SignoutAction />
                        </li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </>
            {/* End Avatar */}
            <button onClick={openMenu} className="lg:hidden">
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
