import CardSkeleton from "./CardSkeleton";
import type { Contact } from "common/providers/ContactProvider/types";
import ContactCard from "./ContactCard";
import Loading from "./Loading";
import React from "react";
import type { ReactNode } from "react";
import RequestsButton from "./Requests/RequestsButton";
import SearchBar from "./SearchBar";
import UserCard from "./UserCard";
import axios from "axios";
import useContact from "common/hooks/useContact";
import { useSession } from "next-auth/react";

const Contacts: React.FC = () => {
  const [rows, setRows] = React.useState<Array<ReactNode>>([]);

  const { data } = useSession();

  React.useEffect(() => {
    if (data) {
      const contactCount = data.user?.contactCount || 0;
      const rows: Array<ReactNode> = [];
      for (let i = 0; i < contactCount; i++) {
        rows.push(<CardSkeleton />);
      }
      setRows(rows);
    }
  }, [data]);

  const { contacts, setContacts, selectedContact, setSelectedContact } = useContact();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [searching, setSearching] = React.useState<boolean>(false);

  const updateContacts = async () => {
    setLoading(true);
    const res = await axios.get("/api/v1/contacts/list");
    const data: Array<Contact> = res.data;

    const contactCount = data.length;
    const rows: Array<ReactNode> = [];
    for (let i = 0; i < contactCount; i++) {
      rows.push(<CardSkeleton />);
    }
    setRows(rows);

    setContacts(data);
    setLoading(false);
  };

  React.useEffect(() => {
    if (contacts === null) {
      updateContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  const [filteredUsers, setFilteredUsers] = React.useState<Array<Contact> | null>(null);
  const [filteredContacts, setFilteredContacts] = React.useState<Array<Contact> | null>(null);

  return (
    <div className="flex select-none flex-col 2xl:h-[844px]">
      <div className="flex items-center justify-between border-light-2 py-3 px-4">
        <SearchBar
          setSearching={setSearching}
          setFilteredUsers={setFilteredUsers}
          setFilteredContacts={setFilteredContacts}
        />
        <RequestsButton updateContacts={updateContacts} />
      </div>
      {!loading ? (
        <div className="flex flex-col overflow-hidden">
          {filteredUsers !== null || filteredContacts !== null ? (
            <>
              {filteredUsers?.length === 0 && filteredContacts?.length === 0 ? (
                <div className="flex items-center justify-center py-6">
                  <h3 className="select-none text-secondary">No results.</h3>
                </div>
              ) : (
                <>
                  <h3 className="ml-6 mt-2 select-none font-semibold">Others</h3>
                  {filteredUsers && filteredUsers?.length > 0 ? (
                    <div className="flex min-h-[72px] flex-col overflow-y-auto">
                      {filteredUsers?.map((contact) => (
                        <UserCard key={contact.id} contact={contact} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <h3 className="select-none text-sm text-secondary">No results.</h3>
                    </div>
                  )}

                  <hr className="mt-4 text-light-2" />
                  <h3 className="ml-6 mt-2 select-none font-semibold">Contacts</h3>
                  {filteredContacts && filteredContacts?.length > 0 ? (
                    <div className="flex min-h-[72px] flex-col overflow-y-auto">
                      {filteredContacts?.map((contact) => (
                        <ContactCard
                          key={contact.id}
                          contact={contact}
                          selected={selectedContact.id === contact.id}
                          setSelectedContact={setSelectedContact}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <h3 className="mt-2 select-none text-sm text-secondary">No results.</h3>
                    </div>
                  )}
                </>
              )}
            </>
          ) : searching === false ? (
            contacts?.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                selected={selectedContact.id === contact.id}
                setSelectedContact={setSelectedContact}
              />
            ))
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        rows.map((row, index) => <CardSkeleton key={index} />)
      )}
    </div>
  );
};

export default Contacts;