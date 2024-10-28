import { useState, useEffect } from "react";
import { CapacitorCookies } from "@capacitor/core";

import { LoggedInUser, userAtom } from "@/lib/appStore";
import { useAtom } from "jotai";

const AUTH_COOKIE_NAME = "auth_session";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const cookies = await CapacitorCookies.getCookies();
        const authCookie = cookies[AUTH_COOKIE_NAME];
        if (!authCookie) {
          throw new Error("Auth cookie not found");
        }

        // Create a request with the auth cookie
        const response = await fetch("/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `${AUTH_COOKIE_NAME}=${authCookie}`,
          },
          credentials: "include", // Ensure cookies are included in the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data.user as LoggedInUser);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useAuth;
