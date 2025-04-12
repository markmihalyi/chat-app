import type { Contact } from "common/providers/ContactProvider/types";
import Image from "next/image";
import React from "react";

// TODO: lastMessage, lastMessageTime

type Props = {
  contact: Contact;
  selected: boolean;
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact>>;
};

const ContactCard: React.FC<Props> = ({ contact, selected, setSelectedContact }) => {
  const handleSelect = () => {
    setSelectedContact(contact);
  };

  // lastMessage =
  //   lastMessage.length > 26
  //     ? lastMessage.substring(0, 26) + "..."
  //     : lastMessage;

  return (
    <div
      className={`-mr-1 flex cursor-pointer select-none py-4 pr-0.5 hover:bg-secondary-light lg:-mr-0 lg:px-2 xl:px-4 2xl:px-4 ${
        selected ? "bg-secondary-light" : ""
      }`}
      onClick={handleSelect}
    >
      <Image
        className="rounded-full border border-gray"
        src={contact.image || "/icons/DefaultUser.png"}
        width={40}
        height={40}
        alt="PFP"
        draggable={false}
      />
      <div className="ml-2 mr-2 flex flex-col items-start justify-center">
        <span className="text-sm font-semibold">{contact.name}</span>
        <span className="text-xs text-secondary">Helló.</span> {/* TODO: fetch last message */}
      </div>
      <span className="ml-auto text-xs text-secondary">08:34 PM</span>
    </div>
  );
};

export default ContactCard;
