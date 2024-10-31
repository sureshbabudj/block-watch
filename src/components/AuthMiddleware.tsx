"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const authPaths = ["signin", "signup"];

export function AuthMiddleware() {
  const { user, loading } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const isHomepage = "/";
  const isCommunityPage = pathname === "/community";
  const isAuthPage = authPaths.some((word) => pathname.startsWith(`/${word}`));

  useEffect(() => {
    if (!loading) {
      if (!user) {
        if (isCommunityPage) {
          router.replace("/signin");
        }
      }

      if (user && (isAuthPage || isHomepage)) {
        router.replace("/community");
      }
    }
  }, [pathname, loading]);

  return (
    <div
      data-pathname={pathname}
      className="fixed h-[100dvh] w-[100dvw] z-20 bg-[#00000077] top-0 left-0"
      hidden={!loading}
    ></div>
  );
}
