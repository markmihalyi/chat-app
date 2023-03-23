import Contacts from "./Contacts";
import React from "react";

const SidebarLeft: React.FC = () => {
  return (
    <div
      className="flex h-full flex-col rounded-bl-2xl border-r border-r-[#CDD5DE] bg-white md:col-span-4 lg:col-span-3 xl:col-span-2"
      style={{
        boxShadow:
          "0px 0px 4px rgba(2, 17, 37, 0.04), 2px 0px 8px rgba(2, 17, 37, 0.04), 6px 0px 16px rgba(2, 17, 37, 0.04)",
      }}
    >
      <Contacts />
    </div>
  );
};

export default SidebarLeft;
