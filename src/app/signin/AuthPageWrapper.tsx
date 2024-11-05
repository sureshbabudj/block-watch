import { PropsWithChildren } from "react";

const AuthPageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <section className="flex flex-col md:flex-row max-h-dvh items-center">
      <div className="bg-[#499911] hidden sm:block w-full md:w-1/2 xl:w-2/3 h-screen relative bg-[url('/file.svg')] bg-no-repeat bg-contain bg-bottom"></div>
      <div
        className="bg-[var(--background)] w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
    flex items-center justify-center"
      >
        <div className="w-full h-100 py-2">{children}</div>
      </div>
    </section>
  );
};

export default AuthPageWrapper;
