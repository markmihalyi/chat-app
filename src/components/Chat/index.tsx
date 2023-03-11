import Message from "components/Chat/Message";
import Messenger from "components/Chat/Messenger";
import React from "react";
import SocketEvents from "common/providers/SocketProvider/types";
import useContact from "common/hooks/useContact";
import useSocket from "common/hooks/useSocket";

export type ChatMessage = {
  text: string;
  date: Date;
  type: "own" | "contact";
};

const Chat: React.FC = () => {
  const { socket, isConnected } = useSocket();
  const { selectedContact } = useContact();

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

  /** TODO: Fetch previous messages from the server */
  React.useEffect(() => {
    if (isConnected && selectedContact) {
      socket?.on(SocketEvents.NEW_MESSAGE, (message: ChatMessage) => {
        setMessages((prev) => [message, ...prev]);
      });
    }
  }, [socket, isConnected, selectedContact]);

  return (
    <div className="flex flex-col pb-10 xl:h-[840px] xl:w-[840px]">
      <div className="mb-12 flex h-full flex-col-reverse overflow-y-auto scroll-smooth border-0 border-green-500 px-6 scrollbar-thin scrollbar-track-white scrollbar-thumb-light-2">
        {messages.map((message, index) => (
          <Message key={index} selectedContact={selectedContact} message={message} />
        ))}
      </div>
      <Messenger selectedUserId={selectedContact.id} socket={socket} />
    </div>
  );
};

export default Chat;
