import Message from "components/Chat/Message";
import Messenger from "components/Chat/Messenger";
import React from "react";
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

  // TODO: Fetch previous messages from the server
  React.useEffect(() => {
    if (isConnected && selectedContact) {
      socket?.on(SocketEvents.NEW_MESSAGE, (message: ChatMessage) => {
        setMessages((prev) => [message, ...prev]);
      });
    }
  }, [socket, isConnected, selectedContact]);

  return (
    <div className="flex flex-col xl:h-[640px] xl:w-[727px] xl:pb-4 2xl:h-[840px] 2xl:w-[840px] 2xl:pb-10">
      <div className="flex h-full flex-col-reverse overflow-y-auto scroll-smooth border-0 border-green-500 scrollbar-thin scrollbar-track-white scrollbar-thumb-light-2 xl:mb-6 xl:px-6 2xl:mb-12 2xl:px-12">
        {messages.map((message, index) => (
          <Message key={index} selectedContact={selectedContact} message={message} />
        ))}
      </div>
      <Messenger selectedUserId={selectedContact.id} />
    </div>
  );
};

export default Chat;
