import React from "react";

const RequestCardSkeleton: React.FC = () => {
  return (
    <div className="flex animate-pulse select-none items-center px-6 py-4">
      <div className="ml-2 h-10 w-10 rounded-full bg-light-2" />
      <div className="ml-2 flex-1 space-y-3 py-1">
        <div className="h-2 w-1/3 rounded bg-light-2"></div>
        <div className="h-2 w-1/2 rounded bg-light-2"></div>
      </div>
    </div>
  );
};

export default RequestCardSkeleton;
