import DashboardLayout from "../components/DashboardLayout";
import type { NextApplicationPage } from "./_app";
import React from "react";

const Profile: NextApplicationPage = () => {
  return <div>Profile</div>;
};

Profile.getLayout = (page) => {
  return <DashboardLayout page={page} />;
};

Profile.requireAuth = true;

export default Profile;
