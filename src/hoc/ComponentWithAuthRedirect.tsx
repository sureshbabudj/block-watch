"use client";

import { useEffect, ComponentType, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Loader } from "@/components/Loader";
import { useAtom } from "jotai";
import { isMenuOpenAtom } from "@/lib/appStore";

interface ComponentWithAuthRedirectProps {
  // Define any additional props your component might need
}

export const ComponentWithAuthRedirect = <
  P extends ComponentWithAuthRedirectProps,
>(
  WrappedComponent: ComponentType<P>
) => {
  const Component = (props: P) => {
    const { user, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [_open, setMenuOpen] = useAtom(isMenuOpenAtom);

    useEffect(() => {
      if (!loading) {
        if (user) {
          if (pathname === "/signin" || pathname === "/signup") {
            router.push("/community");
          }
        } else {
          if (pathname.startsWith("/community")) {
            router.push("/signin", { scroll: false });
          }
        }
      }
      setMenuOpen(false);
    }, [user, router, loading]);

    if (loading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};
