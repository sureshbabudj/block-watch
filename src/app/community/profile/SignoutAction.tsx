import { userAtom } from "@/lib/appStore";
import { Toast } from "@capacitor/toast";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export function SignoutAction() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const signout = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setUser(null);
        router.replace("/signin");
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
