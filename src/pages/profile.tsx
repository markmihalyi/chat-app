import DashboardLayout from "../components/DashboardLayout";
import type { NextApplicationPage } from "./_app";
import type { NextPageContext } from "next";
import React from "react";
import { getSession } from "next-auth/react";

const Profile: NextApplicationPage = () => {
  return <></>;
};

Profile.getLayout = (page) => {
  return <DashboardLayout page={page} />;
};

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Profile;
