import Contacts from './SideBar/Contacts';
import React from 'react';

const SideMenu: React.FC = () => {
  return (
    <div
      className="flex h-full flex-col rounded-bl-2xl border-r-[1px] border-gray bg-white bg-white xl:w-[320px]"
      style={{
        boxShadow:
          '0px 0px 4px rgba(2, 17, 37, 0.04), 2px 0px 8px rgba(2, 17, 37, 0.04), 6px 0px 16px rgba(2, 17, 37, 0.04)',
      }}
    >
      <Contacts />
    </div>
  );
};

export default SideMenu;
