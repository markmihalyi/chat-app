import Chat from "components/Chat";
import DashboardLayout from "../components/DashboardLayout";
import type { NextApplicationPage } from "./_app";
import type { NextPageContext } from "next";
import React from "react";
import { getSession } from "next-auth/react";
import useContact from "common/hooks/useContact";

const Home: NextApplicationPage = () => {
  const { selectedContact } = useContact();

  if (selectedContact.id === "") return null;

  return <Chat />;
};

Home.getLayout = (page) => {
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

export default Home;
