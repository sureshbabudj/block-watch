"use server";
import SigninForm from "@/components/SigninForm";

const SigninPage = async () => {
  return (
    <div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SigninForm />
      </div>
    </div>
  );
};

export default SigninPage;
