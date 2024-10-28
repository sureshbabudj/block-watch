import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { LoggedInUser, userAtom } from "@/lib/appStore";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
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
        setUser(data.user as LoggedInUser);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
  }, [refresh, setUser]);

  const refreshAuth = () => setRefresh((prev) => !prev);

  return { user, loading, error, refreshAuth };
};

export default useAuth;
