import type { ChatMessage } from "components/Chat";
import type { Contact } from "common/providers/ContactProvider/types";
import Image from "next/image";
import React from "react";

type Props = {
  selectedContact: Contact;
  message: ChatMessage;
};

const Message: React.FC<Props> = ({ selectedContact, message }) => {
  const hhss = new Date(message.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  if (message.type === "own") {
    return (
      <div className="my-1.5 flex items-center justify-end">
        <div className="flex flex-col items-start">
          <div className="rounded-t-2xl rounded-bl-2xl bg-[#e9f2fd]">
            <p className="p-3 text-sm lg:text-base">{message.text}</p>
          </div>
          {/* <p className="mt-0.5 self-end text-xs text-secondary">{hhss}</p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="my-1.5 flex items-center space-x-4">
      <Image
        className="mt-1 select-none self-start rounded-full"
        src={selectedContact.image}
        width={40}
        height={40}
        alt="Profilkép"
      />
      <div className="flex flex-col items-start">
        <div className="rounded-2xl bg-[#eef1f4]">
          <p className="p-3 text-sm lg:text-base">{message.text}</p>
        </div>
        {/* <p className="mt-0.5 text-xs text-secondary">{hhss}</p> */}
      </div>
    </div>
  );
};

export default Message;
