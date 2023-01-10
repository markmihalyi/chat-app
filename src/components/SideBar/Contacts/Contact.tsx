import Image from "next/image";
import React from "react";

type Props = {
  username: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  selected: boolean;
  setSelectedContact: React.Dispatch<React.SetStateAction<string>>;
};

const Contact: React.FC<Props> = ({
  username,
  name,
  lastMessage,
  lastMessageTime,
  selected,
  setSelectedContact,
}) => {
  const handleSelect = () => {
    setSelectedContact(username);
    // TODO: Handle contact selection
  };

  let classes = "flex cursor-pointer px-6 py-4 hover:bg-secondary-light";

  if (selected) {
    classes += " bg-secondary-light";
  }

  lastMessage =
    lastMessage.length > 26
      ? lastMessage.substring(0, 26) + "..."
      : lastMessage;

  return (
    <div className={classes} onClick={handleSelect}>
      <Image
        src="/icons/DefaultUser.png"
        width={40}
        height={40}
        alt="Profile picture"
      />
      <div className="ml-2 mr-2 flex flex-col items-start justify-center">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-xs text-secondary">{lastMessage}</span>
      </div>
      <span className="ml-auto text-xs text-secondary">{lastMessageTime}</span>
    </div>
  );
};

export default Contact;
