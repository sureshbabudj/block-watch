import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { LoggedInUser, userAtom } from "@/lib/appStore";

function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    const result: { user: LoggedInUser | null; error: any | null } = {
      user: null,
      error: null,
    };
    // if no sid, there is no session
    if (!getCookie("sid")) {
      setLoading(false);
      return result;
    }
    setLoading(true);
    setError(null); // Reset error state before fetching

    try {
      const response = await fetch("/api/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are included in the request
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      result.user = data.user as LoggedInUser;
      setUser(result.user);
    } catch (err: any) {
      result.error = err;
      setError(err.message);
    } finally {
      setLoading(false);
    }
    return result;
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  const refreshAuth = () =>
    new Promise<{ user: LoggedInUser | null; error: any | null }>(
      async (resolve, reject) => {
        const { user, error } = await fetchUser();
        if (error) {
          reject({ user: null, error });
        } else {
          resolve({ user, error: null });
        }
      }
    );

  return { user, loading, error, refreshAuth };
};

export default useAuth;
