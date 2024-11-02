import { userAtom } from "@/lib/appStore";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export function SignoutAction() {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const signout = async () => {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
      setUser(null);
      router.replace("/signin");
    } else {
      console.error(data.error);
    }
  };
  return <button onClick={signout}>SignOut</button>;
}
