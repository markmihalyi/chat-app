import AcceptButton from "components/SidebarLeft/Contacts/Requests/RequestsDialog/Tabs/Buttons/AcceptButton";
import DeclineButton from "components/SidebarLeft/Contacts/Requests/RequestsDialog/Tabs/Buttons/DeclineButton";
import UnsendButton from "components/SidebarLeft/Contacts/Requests/RequestsDialog/Tabs/Buttons/UnsendButton";
import type { RequestingUser } from "components/SidebarLeft/Contacts/Requests/RequestsDialog/Tabs/IncomingTab";
import Image from "next/image";
import React from "react";

type Props = {
  type: "incoming" | "outgoing";
  user: RequestingUser;
  updateRequests: (contactsChanged?: boolean) => Promise<void>;
};

const RequestCard: React.FC<Props> = ({ type, user, updateRequests }) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (user.name.length > 20) {
      user.name = user.name.substring(0, 20) + "...";
    }
    if (user.bio?.length > 30) {
      user.bio = user.bio.substring(0, 30) + "...";
    }
  }, [user]);

  if (!user.id) return null;

  return (
    <div className="flex select-none px-6 py-4 hover:bg-[#fbfbfb]">
      <Image
        className="ml-2 rounded-full border border-gray"
        src={user.image}
        width={40}
        height={40}
        alt="PFP"
        draggable={false}
      />
      <div className="ml-2 mr-2 flex flex-col items-start justify-center">
        <span className="text-sm font-semibold">{user.name}</span>
        <span className="text-xs text-secondary">{user.bio}</span>
      </div>
      <div className="my-auto ml-auto flex items-center justify-between">
        {type === "incoming" ? (
          <>
            <AcceptButton
              className="mr-1"
              contactId={user.id}
              loading={loading}
              setLoading={setLoading}
              updateRequests={updateRequests}
            />

            <DeclineButton
              contactId={user.id}
              loading={loading}
              setLoading={setLoading}
              updateRequests={updateRequests}
            />
          </>
        ) : (
          <UnsendButton
            contactId={user.id}
            loading={loading}
            setLoading={setLoading}
            updateRequests={updateRequests}
          />
        )}
      </div>
    </div>
  );
};

export default RequestCard;
