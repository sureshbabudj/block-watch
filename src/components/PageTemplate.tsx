import { PropsWithChildren } from "react";
import { AuthMiddleware } from "./AuthMiddleware";

export default function Page({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <AuthMiddleware />
    </>
  );
}
