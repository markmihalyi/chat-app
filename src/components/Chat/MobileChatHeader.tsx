import type { Contact } from "common/providers/ContactProvider/types";
import Image from "next/image";
import React from "react";
import useContacts from "common/hooks/useContacts";

type Props = {
  selectedContact: Contact;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileChatHeader: React.FC<Props> = ({ selectedContact, showMenu, setShowMenu }) => {
  const { resetSelectedContact } = useContacts();

  const handleGoBack = () => {
    resetSelectedContact();
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className="border-b border-b-gray bg-white py-1 md:hidden">
      <div className="flex items-center justify-between space-x-2 px-2">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-light-1 outline-none hover:bg-[#edeef0] active:bg-[#e7e8ea]"
          onClick={handleGoBack}
          aria-label="Back"
        >
          <Image src="/icons/chat/ArrowLeft.svg" alt="Back" width={20} height={20} />
        </button>
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium">{selectedContact.name}</p>
          <p className="text-xs text-secondary">Online</p>
        </div>

        {showMenu ? (
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-light-1 outline-none hover:bg-[#edeef0] active:bg-[#e7e8ea]"
            onClick={handleCloseMenu}
            aria-label="Close"
          >
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-light-1 outline-none hover:bg-[#edeef0] active:bg-[#e7e8ea]"
            onClick={handleShowMenu}
            aria-label="More"
          >
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileChatHeader;
