import Navbar from "./Navbar";
import React from "react";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "components/SidebarRight";
import useContacts from "common/hooks/useContacts";

const DashboardLayout: React.FC<{ page: React.ReactElement }> = ({ page }) => {
  const { selectedContact } = useContacts();

  return (
    <main className="h-screen w-screen 2xl:absolute 2xl:top-1/2 2xl:left-1/2 2xl:h-[92vh] 2xl:w-[95vw] 2xl:-translate-x-1/2 2xl:-translate-y-1/2">
      <div className="flex h-full w-full flex-col bg-white shadow-xl 2xl:rounded-2xl">
        <Navbar />
        {/* Normál nézet (nem mobilos) */}
        <div className="hidden h-full w-full bg-white md:grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-9 2xl:grid-cols-10 2xl:rounded-b-2xl">
          <SidebarLeft />
          {page}
          <SidebarRight />
        </div>
        {/* Mobilos nézet */}
        <div className="h-full w-full bg-white md:hidden">
          {selectedContact.id === "" ? <SidebarLeft /> : page}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
