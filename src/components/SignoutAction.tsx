import { userAtom } from "@/lib/appStore";
import { useAtom } from "jotai";

export function SignoutAction() {
  const [user, setUser] = useAtom(userAtom);
  const signout = async () => {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
      setUser(null);
    } else {
      console.error(data.error);
    }
  };
  return <button onClick={signout}>SignOut</button>;
}
