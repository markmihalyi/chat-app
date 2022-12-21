import type { Contact } from "./Contacts";
import Image from "next/image";
import React from "react";

type Props = {
  setFilteredContacts: React.Dispatch<
    React.SetStateAction<Array<Contact> | null>
  >;
};

const SearchBar: React.FC<Props> = () => {
  const [searchInput, setSearchInput] = React.useState<string>("");

  // TODO: Handle search
  // const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // };

  const checkIfEscapePressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchInput("");
    }
  };

  return (
    <form className="mx-6 my-3 flex h-8 items-start items-center rounded-lg border-[1px] border-gray px-2">
      <Image
        src="/icons/sidebar/Search.svg"
        alt="Search"
        width={20}
        height={20}
      />
      <input
        className="mx-2 h-full w-full text-sm outline-none"
        type="text"
        placeholder="Search"
        value={searchInput}
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
          onClick={() => setSearchInput("")}
        />
      )}
    </form>
  );
};

export default SearchBar;
