import Navbar from "../components/Navbar";
import type { NextApplicationPage } from "./_app";
import React from "react";
import SideMenu from "../components/SideMenu";

const Home: NextApplicationPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col rounded-2xl bg-white shadow-xl xl:h-[900px] xl:w-[1440px]">
        <Navbar />
        <SideMenu />
      </div>
    </main>
  );
};

Home.requireAuth = true;

export default Home;
