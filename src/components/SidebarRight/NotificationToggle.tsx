import { Switch } from "@headlessui/react";
import { useState } from "react";

const NotificationToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-[#0086EA]" : "bg-gray"
      } relative inline-flex h-4 w-7 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-3.5" : "translate-x-0.5"
        } inline-block h-3 w-3 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export default NotificationToggle;
