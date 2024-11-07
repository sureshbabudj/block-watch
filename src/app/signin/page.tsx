"use client";

import { Logo } from "@/components/Header";
import { SigninForm } from "./SigninForm";
import withAuthRedirect from "@/hoc/withAuthRedirect";
import Link from "next/link";
import AuthPageWrapper from "./AuthPageWrapper";

const SigninPage = () => {
  return (
    <AuthPageWrapper>
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
          scroll={false}
          href="/signup"
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Create an account
        </Link>
      </p>
      <p className="mt-8">
        <Link
          href="/"
          scroll={false}
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Go back!
        </Link>
      </p>
    </AuthPageWrapper>
  );
};

export default withAuthRedirect(SigninPage);
