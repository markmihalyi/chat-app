import Image from "next/image";
import React from "react";
import SettingsDialog from "./SettingsDialog";
import UserMenu from "./UserMenu";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data } = useSession();

  const router = useRouter();

  const [showSettingsMenu, setShowSettingsMenu] = React.useState<boolean>(false);

  return (
    <div
      className="isolate flex h-14 w-full justify-between rounded-t-2xl bg-white px-6"
      style={{ boxShadow: "0px 1px 2px rgba(2, 17, 37, 0.12)" }}
    >
      {/* Top left corner */}
      <div
        className="flex cursor-pointer select-none items-center"
        onClick={() => (window.location.href = "/")}
      >
        <Image src="/logos/logo.png" alt="Logo" width={32} height={32} draggable={false} />
        <h1 className="ml-4 text-xl font-bold text-secondary-dark">Chat App</h1>
      </div>
      {/* Top right corner */}
      <div className="flex h-full select-none items-center">
        <div className="flex h-14 w-10 items-center justify-center">
          <Image
            className="w-9 cursor-pointer rounded-full p-1 transition hover:bg-light-1 active:bg-light-2"
            src="/icons/navbar/Settings.svg"
            alt="Settings"
            width={24}
            height={24}
            draggable={false}
            onClick={() => setShowSettingsMenu(true)}
          />
          <SettingsDialog show={showSettingsMenu} setShow={setShowSettingsMenu} />
        </div>
        <UserMenu setShowSettingsMenu={setShowSettingsMenu} />
        <div
          className="flex h-14 w-14 items-center justify-center"
          onClick={() => router.push("/profile")}
        >
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
