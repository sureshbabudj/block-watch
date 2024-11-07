"use client";

import { userAtom } from "@/lib/appStore";
import { useAtom } from "jotai";
import { SignoutAction } from "./SignoutAction";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Profile() {
  const [user] = useAtom(userAtom);

  if (!user) {
    return null;
  }

  return (
    <div className="p-4 w-[100%] max-w-[800px] mx-auto">
      <div className="relative mt-16 p-4 pt-16 rounded-xl border shadow-[0px_20px_20px_-10px_rgba(0,0,0,0.1)] min-h-32">
        <div className="absolute left-0 -top-16 w-full flex align-middle justify-center content-center">
          <Avatar className="hover:border-2 w-32 h-32 shadow-xl">
            {user.profilePicture ? (
              <AvatarImage src={user.profilePicture} alt={user.firstName} />
            ) : (
              <AvatarFallback>
                {`${user.firstName.split("")[0]}${user.lastName.split("")[0]}`}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="flex flex-col items-center space-y-2 my-4 text-slate-800 px-4 sm:px-10">
          <p className="text-4xl">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xl">{user.address}</p>
          <Separator className=" my-8 sm:!my-12" />
          <p className="text-xl text-center">{user.bio}</p>
          <Separator className=" my- sm:!my-12" />
          <ScrollArea className="w-full">
            <div className="flex flex-row space-x-8 justify-around py-4">
              {user.dateOfBirth && (
                <div className="text-center">
                  <p>Born</p>
                  <p className="text-violet-800 text-3xl">
                    {format(user.dateOfBirth, "do")}
                  </p>
                  <p className="w-max">{format(user.dateOfBirth, "LLL yy")}</p>
                </div>
              )}

              <div className="text-center">
                <p>have</p>
                <p className="text-violet-800 text-3xl">45</p>
                <p>Neighbours</p>
              </div>

              <div className="text-center">
                <p>had</p>
                <p className="text-violet-800 text-3xl">7</p>
                <p>Incidents</p>
              </div>

              <div className="text-center">
                <p>sent</p>
                <p className="text-violet-800 text-3xl">11</p>
                <p>Alerts</p>
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <Separator className=" sm:!my-12" />
          <div className="flex flex-row justify-between self-stretch items-center">
            <Button asChild>
              <Link href="/community/profile/update">update profile</Link>
            </Button>
            <Button asChild>
              <SignoutAction />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
