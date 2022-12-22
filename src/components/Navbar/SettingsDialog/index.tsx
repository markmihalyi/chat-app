import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import TabMenu, { tabs } from "./TabMenu";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TabId = "account" | "general" | "notifications";

const SettingsDialog: React.FC<Props> = ({ show, setShow }) => {
  const [selectedTab, setSelectedTab] = React.useState<TabId>("account");

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setShow(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex h-[450px] w-[900px] transform select-none overflow-hidden rounded-2xl bg-white text-left text-secondary-dark shadow-xl transition-all">
                <TabMenu
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />

                {tabs.map((tab) => {
                  if (tab.id === selectedTab) {
                    return (
                      <React.Fragment key={tab.id}>
                        {tab.component}
                      </React.Fragment>
                    );
                  }
                })}

                <button
                  className="absolute top-4 right-4"
                  onClick={() => setShow(false)}
                >
                  <svg
                    className="h-6 w-6 text-secondary-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SettingsDialog;
