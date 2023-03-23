import React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <div className="flex h-[72px] w-full animate-pulse select-none items-center py-4 pr-3 pl-2 lg:pr-4 xl:mr-0 xl:px-4">
      <div className="h-10 w-10 rounded-full bg-light-2" />
      <div className="ml-2 flex-1 space-y-4">
        <div className="flex justify-between">
          <div className="h-2 w-1/2 rounded bg-light-2"></div>
          <div className="h-2 w-14 rounded bg-light-2"></div>
        </div>
        <div className="h-2 w-2/3 rounded bg-light-2"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
