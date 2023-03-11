import DeleteDialog from "components/SidebarRight/DeleteDialog";
import Image from "next/image";
import React from "react";
import useContact from "common/hooks/useContact";

const SidebarRight: React.FC = () => {
  const { selectedContact } = useContact();

  const [showDeleteDialog, setShowDeleteDialog] = React.useState<boolean>(false);

  if (selectedContact.id === "") return null;

  return (
    <div
      className="rounded-br-2xl border-l border-l-[#CDD5DE] bg-white px-6 pt-4 xl:w-[280px]"
      style={{
        boxShadow:
          "0px 0px 4px rgba(2, 17, 37, 0.08), -2px 0px 8px rgba(2, 17, 37, 0.08), -6px 0px 16px rgba(2, 17, 37, 0.04)",
      }}
    >
      <div className="flex items-center">
        <Image
          className="mr-2 rounded-full"
          src={selectedContact.image || "/icons/DefaultUser.png"}
          alt="Profile"
          width={24}
          height={24}
          draggable={false}
        />
        <span className="font-semibold">{selectedContact.name}</span>
        {/* <Image
          className="ml-auto rounded-full"
          src={"/icons/Close.svg"}
          alt="Close"
          width={20}
          height={20}
          draggable={false}
        /> */}
      </div>

      <div className="my-4 h-[1px] w-full rounded-[1px] bg-[#CDD5DE]" />

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Username</span>
          <span className="text-sm font-light">@{selectedContact.username}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Bio</span>
          <span className="text-sm font-light">{selectedContact.bio}</span>
        </div>
      </div>

      <div className="my-4 h-[1px] w-full rounded-[1px] bg-[#CDD5DE]" />

      {/** // TODO: Értesítések ki- és bekapcsolása */}
      {/* <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Notifications</span>
        <NotificationToggle />
      </div>

      <div className="my-4 h-[1px] w-full rounded-[1px] bg-[#CDD5DE]" /> */}

      <div className="flex flex-col">
        <span
          onClick={() => setShowDeleteDialog(true)}
          className="cursor-pointer text-sm text-red-500"
        >
          Delete contact
        </span>
        <DeleteDialog
          contactId={selectedContact.id}
          show={showDeleteDialog}
          setShow={setShowDeleteDialog}
        />
      </div>
    </div>
  );
};

export default SidebarRight;
