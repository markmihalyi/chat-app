import React from "react";
import RequestsDialog from "./RequestsDialog";
import axios from "axios";

type Props = {
  updateContacts: () => Promise<void>;
};

const RequestsButton: React.FC<Props> = ({ updateContacts }) => {
  const [requestCount, setRequestCount] = React.useState<number>(0);

  const [showRequestsMenu, setShowRequestsMenu] = React.useState<boolean>(false);

  // TODO: Értesítések átalakítása WebSocket-re, hogy azonnal frissüljön a szám

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/v1/contacts/requests/count");
        const { count } = res.data;
        setRequestCount(count);
      } catch (err) {
        return;
      }
    })();
  }, []);

  return (
    <>
      <div className="relative inline-block" onClick={() => setShowRequestsMenu(true)}>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray p-1 shadow-sm transition hover:bg-light-1 active:bg-light-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 8C7.96243 8 5.5 10.4624 5.5 13.5C5.5 16.5376 7.96243 19 11 19C14.0376 19 16.5 16.5376 16.5 13.5C16.5 10.4624 14.0376 8 11 8ZM3.5 13.5C3.5 9.35786 6.85786 6 11 6C15.1421 6 18.5 9.35786 18.5 13.5C18.5 17.6421 15.1421 21 11 21C6.85786 21 3.5 17.6421 3.5 13.5Z"
              fill="#8FA0AF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.1845 6.00001L21.1876 6C23.1767 6 25.0843 6.79018 26.4909 8.1967C27.8974 9.60323 28.6876 11.5109 28.6876 13.5C28.6876 15.4891 27.8974 17.3968 26.4909 18.8033C25.0843 20.2098 23.1767 21 21.1876 21C20.6353 21 20.1876 20.5523 20.1876 20C20.1876 19.4477 20.6353 19 21.1876 19C22.6462 19 24.0452 18.4205 25.0766 17.3891C26.1081 16.3576 26.6876 14.9587 26.6876 13.5C26.6876 12.0413 26.1081 10.6424 25.0766 9.61092C24.0455 8.57982 22.6472 8.00041 21.1891 8C20.6816 8.00168 20.1766 8.06981 19.6868 8.20264C19.1538 8.3472 18.6045 8.03229 18.4599 7.49926C18.3154 6.96624 18.6303 6.41694 19.1633 6.27237C19.8222 6.09366 20.5018 6.00209 21.1845 6.00001Z"
              fill="#8FA0AF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 21C9.39525 21 7.81415 21.3857 6.39009 22.1255C4.96604 22.8653 3.74093 23.9369 2.81827 25.2499C2.50072 25.7018 1.87699 25.8107 1.42512 25.4931C0.973255 25.1756 0.864361 24.5519 1.1819 24.1C2.2891 22.5244 3.75923 21.2385 5.46809 20.3507C7.17696 19.463 9.0743 19 11 19C12.9257 19 14.8232 19.463 16.5321 20.3507C18.2409 21.2385 19.7111 22.5244 20.8183 24.1C21.1358 24.5519 21.0269 25.1756 20.575 25.4931C20.1232 25.8107 19.4994 25.7018 19.1819 25.2499C18.2592 23.9369 17.0341 22.8653 15.6101 22.1255C14.186 21.3857 12.6048 21 11 21Z"
              fill="#8FA0AF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.7982 22.1244C24.3741 21.3847 22.7923 20.999 21.1876 21C20.6353 21 20.1876 20.5523 20.1876 20C20.1876 19.4477 20.6353 19 21.1876 19C23.1136 18.9988 25.0109 19.4617 26.7201 20.3496C28.4293 21.2374 29.8994 22.524 31.006 24.1005C31.3233 24.5525 31.2141 25.1762 30.762 25.4935C30.31 25.8108 29.6863 25.7016 29.369 25.2495C28.4471 23.9361 27.2222 22.8641 25.7982 22.1244Z"
              fill="#8FA0AF"
            />
          </svg>
        </div>
        {requestCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-500 px-1.5 py-1 text-[10px] font-bold leading-none text-red-100">
            {requestCount > 99 ? "99+" : requestCount}
          </span>
        )}
      </div>
      <RequestsDialog
        show={showRequestsMenu}
        setShow={setShowRequestsMenu}
        requestCount={requestCount}
        setRequestCount={setRequestCount}
        updateContacts={updateContacts}
      />
    </>
  );
};

export default RequestsButton;
