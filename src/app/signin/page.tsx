"use client";

import { Logo } from "@/components/Header";
import { SigninForm } from "./SigninForm";
import withAuthRedirect from "@/hoc/withAuthRedirect";
import Link from "next/link";

const SigninPage = () => {
  return (
    <section className="flex flex-col md:flex-row max-h-dvh items-center">
      <div className="bg-gradient-to-br from-[#6aa83e] to-[#88ba65] hidden sm:block w-full md:w-1/2 xl:w-2/3 h-screen relative">
        <img
          src="/file.svg"
          alt=""
          className="object-cover absolute bottom-0"
        />
      </div>
      <div
        className="bg-[var(--background)] w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center"
      >
        <div className="w-full h-100">
          <Link href="/">
            <div className="flex flex-row items-center">
              <div className="rounded-full bg-white p-1">
                <Logo />
              </div>
              <p className="ml-3 font-bold text-2xl">Block Watch</p>
            </div>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-4">
            Log in to your account
          </h1>
          <SigninForm />
          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">
            Need an account?{" "}
            <Link
              href="/signup"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
          <p className="mt-8">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Go back!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default withAuthRedirect(SigninPage);
