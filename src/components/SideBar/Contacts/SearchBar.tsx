import type { Contact } from ".";
import Image from "next/image";
import React from "react";
import axios from "axios";

type Props = {
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setContacts: React.Dispatch<React.SetStateAction<Array<Contact> | null>>;
  setFilteredUsers: React.Dispatch<React.SetStateAction<Array<Contact> | null>>;
  setFilteredContacts: React.Dispatch<React.SetStateAction<Array<Contact> | null>>;
};

const SearchBar: React.FC<Props> = ({
  setSearching,
  setContacts,
  setFilteredUsers,
  setFilteredContacts,
}) => {
  const [searchInput, setSearchInput] = React.useState<string>("");

  const clearInput = () => {
    setSearchInput("");
    setFilteredUsers(null);
    setFilteredContacts(null);
    setContacts(null);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchInput(searchInput.trim());

    if (searchInput.length < 1 || searchInput.length > 20) return;

    setFilteredUsers(null);
    setFilteredContacts(null);

    setSearching(true);
    const res = await axios.get("/api/v1/contacts/search", {
      params: {
        val: searchInput,
      },
    });

    const { users, contacts } = res.data;
    setFilteredUsers(users);
    setFilteredContacts(contacts);
    setSearching(false);
  };

  React.useEffect(() => {
    if (searchInput.length === 0) {
      clearInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const checkIfEscapePressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" && searchInput.length > 0) {
      clearInput();
    }
  };

  return (
    <form
      className="flex h-8 w-60 items-center rounded-lg border border-gray px-2 shadow-sm"
      onSubmit={handleFormSubmit}
    >
      <Image
        src="/icons/sidebar/Search.svg"
        alt="Search"
        width={20}
        height={20}
        draggable={false}
      />
      <input
        className="mx-2 h-full w-full text-sm outline-none"
        type="text"
        placeholder="Search"
        value={searchInput}
        minLength={0}
        maxLength={20}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={checkIfEscapePressed}
      />
      {searchInput && (
        <Image
          className="cursor-pointer"
          src="/icons/Close.svg"
          alt="Search"
          width={20}
          height={20}
          onClick={() => clearInput()}
        />
      )}
    </form>
  );
};

export default SearchBar;
