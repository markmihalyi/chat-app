import CardButton from "./CardButton";
import type { Contact } from "common/providers/ContactProvider/types";
import Image from "next/image";
import React from "react";

type Props = {
  contact: Contact & { alreadySentRequest?: boolean };
};

const UserCard: React.FC<Props> = ({ contact }) => {
  if (!contact.id) return null;

  return (
    <div className="flex select-none px-6 py-4">
      <Image
        className="rounded-full border border-gray"
        src={contact.image}
        width={40}
        height={40}
        alt="PFP"
        draggable={false}
      />
      <div className="ml-2 mr-2 flex flex-col items-start justify-center">
        <span className="text-sm font-semibold">{contact?.name}</span>
        <span className="text-xs text-secondary">{contact?.bio}</span>
      </div>
      <div className="my-auto ml-auto">
        <CardButton contactId={contact?.id} alreadySentRequest={contact.alreadySentRequest} />
      </div>
    </div>
  );
};

export default UserCard;
