import React from "react";
import type { ReactNode } from "react";
import RequestCard from "components/SidebarLeft/Contacts/Requests/RequestsDialog/Tabs/RequestCard";
import RequestCardSkeleton from "components/SidebarLeft/Contacts/Requests/RequestsDialog/Tabs/RequestCardSkeleton";
import axios from "axios";
import useContacts from "common/hooks/useContacts";

export type RequestingUser = {
  id: string;
  name: string;
  image: string;
  bio: string;
};

const IncomingTab: React.FC = () => {
  const { incomingRequestCount, setIncomingRequestCount } = useContacts();

  const [users, setUsers] = React.useState<Array<RequestingUser>>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [rows, setRows] = React.useState<Array<ReactNode>>([]);

  const updateRequests = async () => {
    setLoading(true);
    const res = await axios.get("/api/v1/contacts/requests/incoming");
    const data: Array<RequestingUser> = res.data;
    setIncomingRequestCount(data.length);

    const rows: Array<ReactNode> = [];
    for (let i = 0; i < incomingRequestCount; i++) {
      rows.push(<RequestCardSkeleton key={i} />);
    }
    setRows(rows);

    setUsers(data);
    setLoading(false);
  };

  React.useEffect(() => {
    updateRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incomingRequestCount]);

  React.useEffect(() => {
    if (incomingRequestCount > 0) {
      const rows: Array<ReactNode> = [];
      for (let i = 0; i < incomingRequestCount; i++) {
        rows.push(<RequestCardSkeleton key={i} />);
      }
      setRows(rows);
    }

    updateRequests();

    return () => {
      setUsers([]);
      setLoading(true);
      setRows([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col items-center py-8">
      <h1 className="text-2xl font-bold">Incoming requests</h1>
      {!loading ? (
        <>
          {users.length > 0 ? (
            <h3 className="mt-1 text-sm">You have {users.length} incoming requests.</h3>
          ) : (
            <h3 className="mt-1 text-sm">You have no incoming requests.</h3>
          )}
          <div className="mt-8 flex w-full flex-col overflow-y-auto">
            {users.map((user) => (
              <RequestCard
                key={user.id}
                type="incoming"
                user={user}
                updateRequests={updateRequests}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mt-1 flex h-7 w-full items-center justify-center">
            <span className="flex h-2 w-1/2 animate-pulse rounded bg-light-2" />
          </div>
          <div className="mt-6 flex w-full flex-col overflow-y-hidden">
            {rows.map((row) => row)}
          </div>
        </>
      )}
    </div>
  );
};

export default IncomingTab;
