"use client";
import { Profile, Profile1 } from "@/app/community/profile/Profile";
import withAuthRedirect from "@/hoc/withAuthRedirect";

const ProfilePage = () => {
  return <Profile />;
};

export default withAuthRedirect(ProfilePage);
