import Image from "next/image";
import React from "react";
import SocketEvents from "common/providers/SocketProvider/types";
import useSocket from "common/hooks/useSocket";

type Props = {
  selectedUserId: string;
};

const Messenger: React.FC<Props> = ({ selectedUserId }) => {
  const { socket } = useSocket();

  const [message, setMessage] = React.useState("");

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage.length > 0 && socket) {
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
    <div className="mx-auto flex w-[95vw] flex-col rounded-xl border border-[#CDD5DE] md:w-[50vw] lg:w-[40vw] xl:w-[35vw] 2xl:w-[30vw]">
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
