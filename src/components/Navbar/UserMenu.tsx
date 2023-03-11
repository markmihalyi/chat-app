import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

type Props = {
  setShowSettingsMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

type MenuItem = {
  name: string;
  icon: string;
  onClick: () => void;
  divider?: boolean;
};

const UserMenu: React.FC<Props> = ({ setShowSettingsMenu }) => {
  const { data } = useSession();

  const router = useRouter();

  const MenuItems: Array<MenuItem> = [
    {
      name: "Profile",
      icon: "/icons/navbar/user-menu/Profile.svg",
      onClick: () => {
        router.push("/profile");
      },
    },
    {
      name: "Settings",
      icon: "/icons/navbar/user-menu/Settings.svg",
      onClick: () => {
        setShowSettingsMenu(true);
      },
      divider: true,
    },
    {
      name: "Help",
      icon: "/icons/navbar/user-menu/Info.svg",
      onClick: () => {
        router.push("#");
      },
    },
    {
      name: "Sign out",
      icon: "/icons/navbar/user-menu/SignOut.svg",
      onClick: () => {
        signOut();
      },
    },
  ];

  return (
    <Menu as="div" className="flex h-14 w-10 items-center justify-center">
      <Menu.Button>
        <Image
          className="w-9 cursor-pointer rounded-full p-1 transition hover:bg-light-1 active:bg-light-2"
          src="/icons/navbar/DotsThreeVertical.svg"
          alt="Settings"
          width={24}
          height={24}
          draggable={false}
        />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          className="absolute right-0 top-8 flex w-60 flex-col rounded-xl bg-white"
          style={{
            filter:
              "drop-shadow(0px 0px 4px rgba(2, 17, 37, 0.08)) drop-shadow(0px 2px 8px rgba(2, 17, 37, 0.08)) drop-shadow(0px 6px 16px rgba(2, 17, 37, 0.04))",
          }}
        >
          <Menu.Item as="div" className="flex items-center border-b-[1px] border-divider p-3">
            <div className="relative">
              <Image
                className="rounded-full"
                src={data?.user?.image || "/icons/DefaultUser.png"}
                alt="Profile"
                width={40}
                height={40}
                draggable={false}
              />
              <div className="absolute right-0 bottom-0">
                <div className="h-3 w-3 rounded-full border-2 border-white bg-success"></div>
              </div>
            </div>

            <div className="ml-3 flex flex-col">
              <span className="text-sm font-semibold">{data?.user?.name}</span>
              <span className="text-xs text-secondary">{data?.user?.bio}</span>
            </div>
          </Menu.Item>
          {MenuItems.map((item, index) => (
            <Menu.Item key={index}>
              <button
                onClick={item.onClick}
                className={`flex
                ${item.divider ? "border-b border-divider" : ""}
                p-3 hover:bg-secondary-light
                ${index === MenuItems.length - 1 ? "rounded-b-xl" : ""}`}
              >
                <Image
                  className="mr-2"
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  draggable={false}
                />
                <span className="text-sm">{item.name}</span>
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
