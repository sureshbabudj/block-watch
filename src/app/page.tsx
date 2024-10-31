import { Logo } from "@/components/Header";
import Link from "next/link";

const IntroImg = () => <img src="/file.svg" alt="Connct, Protect, Empower" />;

export default function Page() {
  return (
    <div className="flex flex-col justify-center h-[100dvh] w-full bg-gradient-to-br from-[#6aa83e] to-[#88ba65] text-white">
      <div className="relative h-full w-[100%] flex sm:max-w-screen-md mx-auto">
        <div className="absolute w-full z-1 left-0 bottom-0 justify-center flex">
          <IntroImg />
        </div>
        <div className="p-4 relative z-10 w-full items-center flex flex-col">
          <div className="my-4 px-3 w-full">
            <p className="text-3xl font-bold my-4">Connect.</p>
            <p className="text-3xl font-bold my-4">Protect.</p>
            <p className="text-3xl font-bold my-4">Empower.</p>
          </div>

          <div className="flex flex-row items-center mt-10">
            <div className="rounded-full bg-white p-2">
              <Logo />
            </div>
            <p className="ml-3 font-bold text-4xl">Block Watch</p>
          </div>

          <Link
            href="/signin"
            className={`
              inline-flex items-center justify-center px-10 py-3 text-xl w-[80%] absolute bottom-5
              font-semibold leading-6 text-white whitespace-no-wrap
            bg-violet-600 border border-violet-700 rounded-md shadow-sm
            hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-violet-500`}
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
