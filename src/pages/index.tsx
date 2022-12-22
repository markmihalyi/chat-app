import DashboardLayout from "../components/DashboardLayout";
import type { NextApplicationPage } from "./_app";
import React from "react";

const Home: NextApplicationPage = () => {
  return <p>Home</p>;
};

Home.getLayout = (page) => {
  return <DashboardLayout page={page} />;
};

Home.requireAuth = true;

export default Home;
