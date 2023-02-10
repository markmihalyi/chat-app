import Navbar from "./Navbar";
import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout: React.FC<{ page: React.ReactElement }> = ({ page }) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col rounded-2xl bg-white shadow-xl xl:h-[900px] xl:w-[1440px]">
        <Navbar />
        <div className="flex h-full rounded-b-2xl bg-white">
          <Sidebar />
          {page}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
