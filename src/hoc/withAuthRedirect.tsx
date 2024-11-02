"use client";

import { ComponentType } from "react";
import { ComponentWithAuthRedirect } from "./ComponentWithAuthRedirect";

interface WithAuthRedirectProps {
  // Define any additional props your component might need
}

const withAuthRedirect = <P extends WithAuthRedirectProps>(
  WrappedComponent: ComponentType<P>
) => {
  return ComponentWithAuthRedirect(WrappedComponent);
};

export default withAuthRedirect;
