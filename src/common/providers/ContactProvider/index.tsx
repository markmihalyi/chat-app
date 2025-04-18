import axios from "axios";
import useSocket from "common/hooks/useSocket";
import type { Contact } from "common/providers/ContactProvider/types";
import SocketEvents from "common/providers/SocketProvider/types";
import { useSession } from "next-auth/react";
import React from "react";

export type ContactContextType = {
  contacts: Array<Contact> | null;
  setContacts: React.Dispatch<React.SetStateAction<Array<Contact> | null>>;
  contactCount: number;
  selectedContact: Contact;
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact>>;
  resetSelectedContact: () => void;
  incomingRequestCount: number;
  setIncomingRequestCount: React.Dispatch<React.SetStateAction<number>>;
};

const ContactContext = React.createContext<ContactContextType>({} as ContactContextType);

const ContactContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = React.useState<Array<Contact> | null>(null);

  const { data } = useSession();
  const [contactCount, setContactCount] = React.useState<number>(data?.user?.contactCount || 0);
  React.useEffect(() => {
    if (contacts) {
      setContactCount(contacts.length);
    }
  }, [contacts]);

  const [selectedContact, setSelectedContact] = React.useState<Contact>({
    id: "",
    name: "",
    image: "",
  });

  const resetSelectedContact = () => {
    setSelectedContact({
      id: "",
      name: "",
      image: "",
    });
  };

  const [incomingRequestCount, setIncomingRequestCount] = React.useState<number>(0);

  const updateIncomingRequestCount = async () => {
    const res = await axios.get("/api/v1/contacts/requests/count");
    setIncomingRequestCount(res.data.count);
  };

  React.useEffect(() => {
    const userId = data?.user?.id;
    if (userId) {
      updateIncomingRequestCount();
    }
  }, [data]);

  const { socket } = useSocket();

  React.useEffect(() => {
    if (socket) {
      socket.on(SocketEvents.NEW_FRIEND_REQUEST, () => {
        updateIncomingRequestCount();
      });

      socket.on(SocketEvents.FRIEND_REQUEST_UNSENT, () => {
        updateIncomingRequestCount();
      });
    }
  }, [socket]);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        setContacts,
        contactCount,
        selectedContact,
        setSelectedContact,
        resetSelectedContact,
        incomingRequestCount,
        setIncomingRequestCount,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
export { ContactContextProvider };
