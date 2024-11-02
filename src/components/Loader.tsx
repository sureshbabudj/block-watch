import { LucideLoaderCircle } from "lucide-react";

export function Loader() {
  return (
    <div className="fixed top-0 left-0 w-[100dvw] h-[100dvh] z-20 flex flex-col items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
      <LucideLoaderCircle className="animate-spin" width={44} height={44} />
      <span className="text-3xl mt-2 font-bold">Loading...</span>
    </div>
  );
}
