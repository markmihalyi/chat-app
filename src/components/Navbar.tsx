import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data } = useSession();

  return (
    <div
      className="isolate flex w-full justify-between rounded-t-2xl bg-white px-6 xl:h-14"
      style={{ boxShadow: "0px 1px 2px rgba(2, 17, 37, 0.12)" }}
    >
      {/* Top left corner */}
      <div className="flex select-none items-center">
        <Image
          className="mr-4"
          src="/logo.png"
          alt="Logo"
          width={32}
          height={32}
          draggable={false}
        />
        <h1 className="text-secondary-dark text-xl font-semibold">Chat App</h1>
      </div>
      {/* Top right corner */}
      <div className="flex select-none items-center">
        <div className="px-2">
          <Image
            className="cursor-pointer"
            src="/icons/navbar/Settings.svg"
            alt="Settings"
            width={24}
            height={24}
            draggable={false}
          />
        </div>
        <div className="px-2">
          <Image
            className="cursor-pointer"
            src="/icons/navbar/DotsThreeVertical.svg"
            alt="Settings"
            width={24}
            height={24}
            draggable={false}
          />
        </div>
        <div className="pl-3">
          <Image
            className="cursor-pointer rounded-full"
            src={data?.user?.image || "/icons/DefaultUser.png"}
            alt="Settings"
            width={32}
            height={32}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
