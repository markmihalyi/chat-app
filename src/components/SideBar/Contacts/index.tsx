import Contact from "./Contact";
import React from "react";
import SearchBar from "../SearchBar";

export type Contact = {
  username: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
};

const Contacts: React.FC = () => {
  const [contacts, setContacts] = React.useState<Array<Contact>>([
    {
      username: "floyd",
      name: "Floyd Flores",
      lastMessage:
        "Hey, how are you doing? I am asking you this because I am bored and I have nothing to do.",
      lastMessageTime: "12:33 AM",
    },
    {
      username: "joseph",
      name: "Joseph Flores",
      lastMessage: "Ok, bye.",
      lastMessageTime: "5:12 AM",
    },
  ]);

  const [filteredContacts, setFilteredContacts] =
    React.useState<Array<Contact> | null>(null);

  const [selectedContact, setSelectedContact] = React.useState<string>("");

  return (
    <div className="flex h-full flex-col">
      <SearchBar setFilteredContacts={setFilteredContacts} />

      <div className="flex flex-col overflow-y-auto">
        {filteredContacts !== null
          ? filteredContacts.map((contact) => (
              <Contact
                key={contact.username}
                selected={selectedContact === contact.username}
                setSelectedContact={setSelectedContact}
                {...contact}
              />
            ))
          : contacts.map((contact) => (
              <Contact
                key={contact.username}
                selected={selectedContact === contact.username}
                setSelectedContact={setSelectedContact}
                {...contact}
              />
            ))}
      </div>
    </div>
  );
};

export default Contacts;
