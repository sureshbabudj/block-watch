"use client";
import { Profile } from "@/app/community/profile/Profile";
import withAuthRedirect from "@/hoc/withAuthRedirect";

const SigninPage = () => {
  return (
    <div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Profile />
      </div>
    </div>
  );
};

export default withAuthRedirect(SigninPage);
