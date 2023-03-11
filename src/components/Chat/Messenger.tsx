import type { DefaultEventsMap } from "socket.io/dist/typed-events";
import Image from "next/image";
import React from "react";
import type { Socket } from "socket.io-client";
import SocketEvents from "common/providers/SocketProvider/types";

type Props = {
  selectedUserId: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
};

const Messenger: React.FC<Props> = ({ socket, selectedUserId }) => {
  const [message, setMessage] = React.useState("");

  const sendMessage = () => {
    if (message) {
      socket?.emit(SocketEvents.SEND_MESSAGE, message, selectedUserId);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="mx-auto flex flex-col rounded-xl border border-[#CDD5DE] xl:w-[600px]">
      <input
        className="w-full select-none rounded-t-xl py-[14px] px-3 text-sm text-primary outline-none transition-all placeholder:text-[#8FA0AF] focus:bg-[#fcfcfc] hover:bg-[#fcfcfc]"
        type="text"
        placeholder="Write a message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <span className="h-[1px] w-full bg-[#CDD5DE]" />
      <div className="flex select-none rounded-b-xl bg-[#F8F9FA] py-[7px] px-3">
        <div className="flex items-center justify-center space-x-5">
          <Image
            className="m-1.5 cursor-pointer"
            src="/icons/chat/Microphone.svg"
            width={20}
            height={20}
            alt="Attachment"
            draggable={false}
          />
          <Image
            className="m-1.5 cursor-pointer"
            src="/icons/chat/Paperclip.svg"
            width={20}
            height={20}
            alt="Attachment"
            draggable={false}
          />
        </div>
        <button
          className="ml-auto rounded-lg border border-[#D4D4D4] px-3 py-1.5 text-sm font-semibold text-[#9E9E9E] transition-all hover:bg-[#f0f1f2] active:bg-[#e9eaeb]"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messenger;
