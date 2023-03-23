import Message from "components/Chat/Message";
import Messenger from "components/Chat/Messenger";
import MobileChatHeader from "components/Chat/MobileChatHeader";
import React from "react";
import SidebarRight from "components/SidebarRight";
import SocketEvents from "common/providers/SocketProvider/types";
import useContacts from "common/hooks/useContacts";
import useSocket from "common/hooks/useSocket";

export type ChatMessage = {
  text: string;
  date: Date;
  type: "own" | "contact";
};

const Chat: React.FC = () => {
  const { socket, isConnected } = useSocket();
  const { selectedContact } = useContacts();

  const [messages, setMessages] = React.useState<Array<ChatMessage>>([
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 8),
      type: "own",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 7),
      type: "contact",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 7),
      type: "own",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 6),
      type: "contact",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 5),
      type: "own",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 5),
      type: "contact",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 8),
      type: "own",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 7),
      type: "contact",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 7),
      type: "own",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 6),
      type: "contact",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 5),
      type: "own",
    },
    {
      text: "Lorem ipsum dolor sit amet",
      date: new Date(2021, 8, 1, 1, 5),
      type: "contact",
    },
  ]);

  const [showMenu, setShowMenu] = React.useState(false);

  // TODO: Fetch previous messages from the server

  React.useEffect(() => {
    if (isConnected && selectedContact) {
      socket?.on(SocketEvents.NEW_MESSAGE, (message: ChatMessage) => {
        setMessages((prev) => [message, ...prev]);
      });
    }
  }, [socket, isConnected, selectedContact]);

  return (
    <div className="flex h-[91vh] flex-col pb-1 md:col-span-8 md:h-[92vh] lg:col-span-7 lg:pb-2 xl:col-span-5 2xl:col-span-6 2xl:h-[85vh]">
      <MobileChatHeader
        selectedContact={selectedContact}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      {showMenu ? (
        <SidebarRight />
      ) : (
        <>
          <div className="mb-2 flex h-full flex-col-reverse overflow-y-auto scroll-smooth border-0 border-green-500 px-3 scrollbar-thin scrollbar-track-white scrollbar-thumb-light-2 md:mb-4 lg:px-6 2xl:mb-6 2xl:px-12">
            {messages.map((message, index) => (
              <Message key={index} selectedContact={selectedContact} message={message} />
            ))}
          </div>
          <Messenger selectedUserId={selectedContact.id} />
        </>
      )}
    </div>
  );
};

export default Chat;
