"use client";

import withAuthRedirect from "@/hoc/withAuthRedirect";
import { Profile } from "./Profile";

const ProfilePage = () => {
  return <Profile />;
};

export default withAuthRedirect(ProfilePage);
