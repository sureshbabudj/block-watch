import useAuth from "@/hooks/useAuth";
import { Toast } from "@capacitor/toast";
import { useRouter } from "next/navigation";

export function SignoutAction() {
  const { refreshAuth } = useAuth();
  const router = useRouter();
  const signout = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        await refreshAuth();
        router.push("/signin");
      } else {
        throw data.error;
      }
    } catch (error: any) {
      await Toast.show({
        text: error.message || "An error occurred while signing out",
      });
    }
  };
  return (
    <a className="cursor-pointer" onClick={signout}>
      Sign Out
    </a>
  );
}
