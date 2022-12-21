import Image from 'next/image';
import React from 'react';
import { Transition } from '@headlessui/react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

type Props = {
  type: NotificationType | null;
  message: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Notification: React.FC<Props> = ({ type, message, show, setShow }) => {
  if (type === null) return null;

  const NotificationType = type.charAt(0).toUpperCase() + type.slice(1);

  const NotificationColor = {
    Success: 'bg-success-light',
    Info: 'bg-info-light',
    Error: 'bg-error-light',
    Warning: 'bg-warning-light',
  };

  return (
    <Transition
      show={show}
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`mb-4 flex w-full items-center rounded-lg p-3 ${
          type === 'success'
            ? NotificationColor.Success
            : type === 'info'
            ? NotificationColor.Info
            : type === 'error'
            ? NotificationColor.Error
            : type === 'warning' && NotificationColor.Warning
        }`}
      >
        <Image
          className="mr-auto"
          src={`/icons/notification/${NotificationType}.svg`}
          alt={NotificationType}
          width={24}
          height={24}
        />
        <div className="mx-2 flex flex-col text-sm">
          <span className="font-medium">{message}</span>
        </div>
        <Image
          className="ml-auto cursor-pointer"
          src="/icons/Close.svg"
          alt="Error"
          width={24}
          height={24}
          onClick={() => setShow(false)}
        />
      </div>
    </Transition>
  );
};

export default Notification;
