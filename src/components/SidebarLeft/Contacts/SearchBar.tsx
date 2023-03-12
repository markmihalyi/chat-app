import type { Contact } from "common/providers/ContactProvider/types";
import Image from "next/image";
import React from "react";
import SocketEvents from "common/providers/SocketProvider/types";
import axios from "axios";
import useContacts from "common/hooks/useContacts";
import useSocket from "common/hooks/useSocket";

type Props = {
  setSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredUsers: React.Dispatch<React.SetStateAction<Array<Contact> | null>>;
  setFilteredContacts: React.Dispatch<React.SetStateAction<Array<Contact> | null>>;
};

const SearchBar: React.FC<Props> = ({ setSearching, setFilteredUsers, setFilteredContacts }) => {
  const { setContacts } = useContacts();

  const [searchInput, setSearchInput] = React.useState<string>("");

  const clearInput = () => {
    setSearchInput("");
    setFilteredUsers(null);
    setFilteredContacts(null);
    setContacts(null);
  };

  const updateSearchResult = async () => {
    try {
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
    } catch (err) {
      setSearching(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchInputTrimmed = searchInput.trim();
    setSearchInput(searchInputTrimmed);

    if (searchInputTrimmed.length < 1 || searchInputTrimmed.length > 20) return;

    setFilteredUsers(null);
    setFilteredContacts(null);

    await updateSearchResult();
  };

  const { socket } = useSocket();
  React.useEffect(() => {
    if (socket) {
      socket.on(SocketEvents.FRIEND_REQUEST_ACCEPTED, () => {
        clearInput();
      });

      socket.on(SocketEvents.FRIEND_REQUEST_UNSENT, () => {
        clearInput();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

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
      className="flex h-8 items-center rounded-lg border border-gray px-2 shadow-sm 2xl:w-60"
      onSubmit={handleFormSubmit}
    >
      <Image
        src="/icons/sidebar-left/Search.svg"
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
