import React from "react";

const NotificationsTab: React.FC = () => {
  return (
    <div className="flex w-full flex-col py-8 px-12">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <h3 className="mt-1 text-sm">
        You can turn off notifications for specific events
      </h3>
    </div>
  );
};

export default NotificationsTab;
