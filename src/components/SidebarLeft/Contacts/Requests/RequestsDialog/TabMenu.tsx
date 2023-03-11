import Image from "next/image";
import IncomingTab from "./Tabs/IncomingTab";
import OutgoingTab from "./Tabs/OutgoingTab";
import React from "react";
import type { TabId } from ".";

type Props = {
  selectedTab: TabId;
  setSelectedTab: React.Dispatch<React.SetStateAction<TabId>>;
};

type Tab = {
  id: TabId;
  name: string;
  icon: string;
  component: JSX.Element;
};

export const tabs: Array<Tab> = [
  {
    id: "incoming",
    name: "Incoming",
    icon: "/icons/sidebar-left/requests/FolderNotchOpen.svg",
    component: <IncomingTab />,
  },
  {
    id: "outgoing",
    name: "Outgoing",
    icon: "/icons/sidebar-left/requests/Signpost.svg",
    component: <OutgoingTab />,
  },
];

const TabMenu: React.FC<Props> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div
      className="flex h-full flex-col rounded-l-2xl border-r-[1px] border-divider bg-[#f6f6f6] py-8"
      style={{
        boxShadow:
          "0px 0px 2px rgba(2, 17, 37, 0.04), 1px 0px 4px rgba(2, 17, 37, 0.04), 3px 0px 8px rgba(2, 17, 37, 0.04)",
      }}
    >
      <h1 className="text-center text-2xl font-extrabold">Requests</h1>
      <div className="mt-6 flex flex-col">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={
              "flex cursor-pointer items-center justify-center py-3 px-12" +
              (selectedTab === tab.id ? " bg-[#ebebeb]" : " hover:bg-[#f0f0f0]")
            }
            onClick={() => setSelectedTab(tab.id)}
          >
            <Image
              className="mr-3"
              src={tab.icon}
              alt={tab.name}
              width={24}
              height={24}
              draggable={false}
            />
            <h2 className="text-base font-semibold">{tab.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabMenu;
