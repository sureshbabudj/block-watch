import { LucideLoaderCircle } from "lucide-react";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
      <LucideLoaderCircle className="animate-spin" width={44} height={44} />
      <span className="text-3xl mt-2 font-bold">Loading...</span>
    </div>
  );
}
