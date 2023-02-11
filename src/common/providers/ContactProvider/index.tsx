import type { Contact } from "common/providers/ContactProvider/types";
import React from "react";

export type ContactContextType = {
  contacts: Array<Contact> | null;
  setContacts: React.Dispatch<React.SetStateAction<Array<Contact> | null>>;
  selectedContact: Contact;
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact>>;
};

const ContactContext = React.createContext<ContactContextType>({} as ContactContextType);

const ContactContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = React.useState<Array<Contact> | null>(null);

  const [selectedContact, setSelectedContact] = React.useState<Contact>({
    id: "",
    name: "",
    username: "",
    image: "",
  });

  return (
    <ContactContext.Provider value={{ contacts, setContacts, selectedContact, setSelectedContact }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContext;
export { ContactContextProvider };
