"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const protectedPaths = ["profile", "main"];
const authPaths = ["signin", "signup"];

export function AuthMiddleware() {
  const { user, loading, error, refreshAuth } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";
  const isProtected = protectedPaths.some((word) =>
    pathname.startsWith(`/${word}`),
  );
  const isAuthPage = authPaths.some((word) => pathname.startsWith(`/${word}`));

  useEffect(() => {
    if (!loading) {
      if (!user) {
        if (isProtected || isHomePage) {
          router.replace("/signin");
        }
      }

      if (user && isAuthPage) {
        router.replace("/main");
      }
    }
  }, [pathname, loading]);

  return <div data-pathname={pathname} hidden></div>;
}
