import React from "react";

const GeneralTab: React.FC = () => {
  return (
    <div className="flex w-full flex-col py-8 px-12">
      <h1 className="text-2xl font-bold">General Settings</h1>
      <h3 className="mt-1 text-sm">Settings for your general experience</h3>

      {/* <div className="flex items-center justify-between py-2">
          <h2 className="w-60 text-lg font-bold">Dark Mode</h2>
        </div>
        <div className="flex items-center justify-between py-2">
          <h2 className="w-60 text-lg font-bold">Timezone</h2>
        </div> */}
    </div>
  );
};

export default GeneralTab;
