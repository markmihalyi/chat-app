import Navbar from "./Navbar";
import React from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "components/SidebarRight";

const DashboardLayout: React.FC<{ page: React.ReactElement }> = ({ page }) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col rounded-2xl bg-white shadow-xl xl:h-[700px] xl:w-[1250px] 2xl:h-[770px] 2xl:w-[1440px]">
        <Navbar />
        <div className="flex h-full rounded-b-2xl bg-white">
          <SidebarLeft />
          {page}
          <SidebarRight />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
