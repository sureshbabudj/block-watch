"use client";

import { useEffect, ComponentType, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Loader } from "@/components/Loader";

interface ComponentWithAuthRedirectProps {
  // Define any additional props your component might need
}

export const ComponentWithAuthRedirect = <
  P extends ComponentWithAuthRedirectProps,
>(
  WrappedComponent: ComponentType<P>
) => {
  const Component = (props: P) => {
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(authLoading);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
      const bodyElm = document.querySelector("body");
      if (!loading) {
        if (bodyElm) bodyElm.style.overflow = "auto";
        if (user) {
          if (pathname === "/signin" || pathname === "/signup") {
            router.replace("/community");
          }
        } else {
          if (pathname.startsWith("/community")) {
            router.replace("/signin");
          }
        }
      } else {
        if (bodyElm) bodyElm.style.overflow = "hidden";
      }
      setLoading(authLoading);
    }, [user, router, authLoading]);

    if (loading) {
      return <Loader />;
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};
