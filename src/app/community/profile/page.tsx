"use client";
import { Profile, Profile1 } from "@/app/community/profile/Profile";
import withAuthRedirect from "@/hoc/withAuthRedirect";

const ProfilePage = () => {
  return <Profile1 />;
};

export default withAuthRedirect(ProfilePage);
