'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="mb-4 px-4 m-4 md:px-0 flex justify-between items-center bg-white shadow-lg rounded-lg ring-2 ring-black">
        <button
          className="md:hidden p-4 text-2xl"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        <Image
          className="p-4"
          src={'/starterylogo.png'}
          alt="startery logo"
          width={242}
          height={64}
        />

        <div className="hidden md:flex gap-6 items-center p-4 ">
          <button className="flex items-center gap-2 text-xl  p-1 underline underline-offset-2 ">
            <Image
              src="/sidenav-icons/inbox.png"
              alt="Inbox"
              width={30}
              height={30}
            />
            Inbox
          </button>
          <button className="flex items-center gap-2 text-xl  p-1 underline underline-offset-2 ">
            <Image
              src="/sidenav-icons/notifications.png"
              alt="Notifications"
              width={30}
              height={30}
            />
            Notifications
          </button>
          <button className="flex items-center gap-2 text-xl  p-1 underline underline-offset-2 ">
            <Image
              src="/sidenav-icons/logout.png"
              alt="Logout"
              width={30}
              height={30}
            />
            Logout
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 flex justify-start items-start z-50">
          <div className="bg-white h-full w-3/4 md:w-1/4 p-6 flex flex-col">
            <button
              className="self-end mb-4 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <button className="flex items-center gap-4 mb-6 text-xl">
              <Image
                src="/sidenav-icons/inbox.png"
                alt="Inbox"
                width={30}
                height={30}
              />
              Inbox
            </button>
            <button className="flex items-center gap-4 mb-6 text-xl">
              <Image
                src="/sidenav-icons/notifications.png"
                alt="Notifications"
                width={30}
                height={30}
              />
              Notifications
            </button>
            <button className="flex items-center gap-4 mb-6 text-xl">
              <Image
                src="/sidenav-icons/logout.png"
                alt="Logout"
                width={30}
                height={30}
              />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
