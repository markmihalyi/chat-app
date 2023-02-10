import React from "react";
import axios from "axios";

const CardButton: React.FC<{ contactId?: string; alreadySentRequest?: boolean }> = ({
  alreadySentRequest,
  contactId,
}) => {
  const [state, setState] = React.useState<"add" | "sent">("add");
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (alreadySentRequest) {
      setState("sent");
    }
  }, [alreadySentRequest]);

  const handleClick = async () => {
    try {
      setLoading(true);
      await axios.put("/api/v1/contacts/requests/send", { id: contactId });
      setState("sent");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {!loading ? (
        <>
          {state === "add" ? (
            <svg
              className="cursor-pointer rounded-full hover:bg-light-1 active:bg-light-2"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              onClick={handleClick}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 16C10 15.4477 10.4477 15 11 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H11C10.4477 17 10 16.5523 10 16Z"
                fill="#8FA0AF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 10C16.5523 10 17 10.4477 17 11V21C17 21.5523 16.5523 22 16 22C15.4477 22 15 21.5523 15 21V11C15 10.4477 15.4477 10 16 10Z"
                fill="#8FA0AF"
              />
            </svg>
          ) : state === "sent" ? (
            <svg
              className="p-1.5"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.7071 8.29289C28.0976 8.68342 28.0976 9.31658 27.7071 9.70711L13.7071 23.7071C13.3166 24.0976 12.6834 24.0976 12.2929 23.7071L5.29289 16.7071C4.90237 16.3166 4.90237 15.6834 5.29289 15.2929C5.68342 14.9024 6.31658 14.9024 6.70711 15.2929L13 21.5858L26.2929 8.29289C26.6834 7.90237 27.3166 7.90237 27.7071 8.29289Z"
                fill={alreadySentRequest ? "#8FA0AF" : "#0086EA"}
              />
            </svg>
          ) : null}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center overflow-hidden" role="status">
          <svg
            className="dark:text-gray-600 mr-2 inline h-4 w-4 animate-spin fill-theme-darker text-[#E4E4E4]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default CardButton;
