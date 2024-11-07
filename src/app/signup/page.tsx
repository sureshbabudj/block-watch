"use client";

import UserDetailsForm from "./UserDetailsForm";
import Link from "next/link";
import { Logo } from "@/components/Header";
import withAuthRedirect from "@/hoc/withAuthRedirect";
import AuthPageWrapper from "../signin/AuthPageWrapper";

function SignupWizard() {
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
        Create Your Account
      </h1>
      <UserDetailsForm />
      <hr className="my-6 border-gray-300 w-full" />
      <p className="mt-8">
        Already have an account?{" "}
        <Link
          href="/signin"
          scroll={false}
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Login
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
}

export default withAuthRedirect(SignupWizard);
