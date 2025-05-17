'use client';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { PiSignOutBold } from 'react-icons/pi';

export const SignInButton = () => {
  const session = useSession();
  const [toggleMenu, SetToggleMenu] = useState<boolean>(false);
  return (
    <>
      {session && session.data?.user ? (
        <span className="z-[10]">
          <button onClick={() => SetToggleMenu(!toggleMenu)}>
            <img
              alt="tania andrew"
              src={session.data.user.image || ''}
              className="relative inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center"
              data-popover-target="profile-menu"
            />
          </button>
          {toggleMenu && (
            <ul
              role="menu"
              data-popover="profile-menu"
              data-popover-placement="bottom"
              className="absolute z-10 mr-12 min-w-[150px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
            >
              <li
                role="menuitem"
                className="flex w-full cursor-pointer items-center rounded-md p-3 text-sm text-slate-800 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
                <BiSolidPurchaseTagAlt />

                <p className="ml-2 font-medium text-slate-800">Purchases</p>
              </li>

              <hr className="my-2 border-slate-200" role="menuitem" />
              <li
                role="menuitem"
                className="flex w-full cursor-pointer items-center rounded-md p-3 text-sm text-slate-800 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
                <PiSignOutBold />

                <button
                  className="ml-2 font-medium text-slate-800"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          )}
        </span>
      ) : (
        <div className="hover:text-green-600 md:mr-12">
          <button onClick={() => signIn('google')}>Sign In</button>
        </div>
      )}
    </>
  );
};

const UserSessionMenu = () => {
  return (
    <>
      <button
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
        className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Dropdown header{' '}
        <svg
          className="ms-3 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownInformation"
        className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700"
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Bonnie Green</div>
          <div className="truncate font-medium">name@flowbite.com</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </a>
        </div>
      </div>
    </>
  );
};
