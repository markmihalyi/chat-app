import ContactContext from "common/providers/ContactProvider";
import type { ContactContextType } from "common/providers/ContactProvider";
import React from "react";

const useContacts = () => {
  const data = React.useContext<ContactContextType>(ContactContext);
  return data;
};

export default useContacts;
