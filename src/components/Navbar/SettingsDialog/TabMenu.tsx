import AccountTab from "./Tabs/AccountTab";
import GeneralTab from "./Tabs/GeneralTab";
import Image from "next/image";
import NotificationsTab from "./Tabs/NotificationsTab";
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
    id: "account",
    name: "Account",
    icon: "/icons/navbar/settings-menu/Account.svg",
    component: <AccountTab />,
  },
  {
    id: "general",
    name: "General",
    icon: "/icons/navbar/settings-menu/General.svg",
    component: <GeneralTab />,
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: "/icons/navbar/settings-menu/Notification-a.svg",
    component: <NotificationsTab />,
  },
];

const TabMenu: React.FC<Props> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div
      className="flex h-full w-80 flex-col rounded-l-2xl border-r-[1px] border-divider bg-[#f6f6f6] py-8"
      style={{
        boxShadow:
          "0px 0px 2px rgba(2, 17, 37, 0.04), 1px 0px 4px rgba(2, 17, 37, 0.04), 3px 0px 8px rgba(2, 17, 37, 0.04)",
      }}
    >
      <h1 className="ml-6 text-2xl font-extrabold">Settings</h1>
      <div className="mt-6 flex flex-col">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={
              "flex cursor-pointer items-center py-3 px-6" +
              (selectedTab === tab.id ? " bg-[#ebebeb]" : " hover:bg-[#f0f0f0]")
            }
            onClick={() => setSelectedTab(tab.id)}
          >
            <Image
              className="mr-3"
              src={tab.icon}
              alt="Account"
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
