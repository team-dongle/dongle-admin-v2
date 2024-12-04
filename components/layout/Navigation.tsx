"use client";

import React, { useEffect, useState } from "react";
import { adminNavList, clubNavList } from "@/constants/nav";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import CloseIcon from "@/assets/icons/close-icon.svg";
import HamburgerIcon from "@/assets/icons/hamburger-icon.svg";
import { serviceLogout } from "@/apis/auth";
import LogoutIcon from "@/assets/icons/logout-icon.svg";
import Link from "next/link";

interface Props {
  role: "ADMIN" | "CLUB";
}

const Navigation = ({ role = "ADMIN" }: Props) => {
  const menuList = role === "ADMIN" ? adminNavList : clubNavList;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "";
  }, [isOpen]);

  const isInPage = (href: string) =>
    pathname
      .split("/")
      .filter((e) => e !== "")
      .includes(href);

  return (
    <>
      <nav className={clsx("flex w-full flex-col items-start max-md:hidden")}>
        {menuList.map((item) => (
          <Link
            prefetch={false}
            key={item.id}
            href={item.href}
            className={clsx(
              `text-md relative flex h-14 w-full flex-row items-center justify-start gap-2 px-5 text-gray-300`,
              {
                [`bg-sky-950 text-white shadow-[0_0_10px_4px_rgba(0,0,0,0.1)] after:absolute after:right-0 after:h-full after:w-3 after:bg-sky-700 after:content-[""]`]:
                  isInPage(item.href.slice(1)) ||
                  (pathname === "/" && item.href === pathname),
              },
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <button className="md:hidden" onClick={() => setIsOpen(true)}>
        <HamburgerIcon className="fill-white" width={32} height={32} />
      </button>
      <nav
        className={clsx(
          "fixed right-0 top-0 z-30 flex h-screen w-[90%] flex-col items-start justify-start gap-4 bg-white pt-16 transition-transform duration-500 ease-in-out md:hidden",
          { [`translate-x-[0%]`]: isOpen, [`translate-x-[100%]`]: !isOpen },
        )}
      >
        <button
          className="absolute left-4 top-4"
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon width={24} height={24} />
        </button>
        <ul className="w-full">
          {menuList.map((item) => (
            <li
              key={item.id}
              className={clsx(
                `text-md relative flex h-14 w-full flex-row items-center justify-start gap-2 text-gray-500`,
                {
                  [`bg-gray-100 text-gray-500`]:
                    isInPage(item.href.slice(1)) ||
                    (pathname === "/" && item.href === pathname),
                },
              )}
            >
              <a
                className="flex h-full w-full items-center justify-start pl-4"
                href={item.href}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="absolute bottom-0 flex h-14 w-full flex-row gap-2 rounded-md border-0 pl-6 text-left text-base text-gray-500"
          onClick={async () => await serviceLogout()}
        >
          <LogoutIcon className="fill-gray-500" />
          로그아웃
        </button>
      </nav>
      <div
        onClick={() => setIsOpen(false)}
        className={clsx(
          "fixed left-0 top-0 h-screen w-screen bg-black opacity-0 transition-opacity duration-500 md:hidden",
          {
            [`pointer-events-auto opacity-60`]: isOpen,
            [`pointer-events-none opacity-0`]: !isOpen,
          },
        )}
      ></div>
    </>
  );
};

export default Navigation;
