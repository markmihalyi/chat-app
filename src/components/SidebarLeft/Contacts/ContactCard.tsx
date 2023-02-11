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
    // TODO: Handle contact selection
  };

  let classes = "flex cursor-pointer px-6 py-4 hover:bg-secondary-light select-none";

  if (selected) {
    classes += " bg-secondary-light";
  }

  // lastMessage =
  //   lastMessage.length > 26
  //     ? lastMessage.substring(0, 26) + "..."
  //     : lastMessage;

  return (
    <div className={classes} onClick={handleSelect}>
      <Image
        className="rounded-full border border-gray"
        src={contact?.image || "/icons/DefaultUser.png"}
        width={40}
        height={40}
        alt="PFP"
        draggable={false}
      />
      <div className="ml-2 mr-2 flex flex-col items-start justify-center">
        <span className="text-sm font-semibold">{contact?.name}</span>
        <span className="text-xs text-secondary">na és család megvan?</span>
      </div>
      <span className="ml-auto text-xs text-secondary">08:34 PM</span>
    </div>
  );
};

export default ContactCard;
