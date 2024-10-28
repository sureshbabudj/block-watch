"use server";
import { NewUserWizard } from "@/components/NewUserWizard";
import OnBoaringFlow from "@/components/OnBoarding";

const SignupPage = async () => {
  return (
    <div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <NewUserWizard />
      </div>
    </div>
  );
};

export default SignupPage;
